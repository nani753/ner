import Parser from 'rss-parser';
import sanitizeHtml from 'sanitize-html';
import { RSSSource, RSSItem } from '@/lib/models';
import connectDB from '@/lib/db';

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'media'],
      ['content:encoded', 'contentEncoded'],
    ],
  },
});

// Sanitize HTML content
const sanitizeContent = (html: string) => {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'title'],
    },
  });
};

// Create excerpt from content
const createExcerpt = (content: string, length = 200) => {
  const strippedContent = content.replace(/<[^>]+>/g, '');
  return strippedContent.length > length
    ? `${strippedContent.substring(0, length)}...`
    : strippedContent;
};

// Fetch and process RSS feed
export async function fetchRSSFeed(source: any) {
  try {
    const feed = await parser.parseURL(source.feedUrl);

    const items = await Promise.all(
      feed.items.map(async (item) => {
        const content =
          item.contentEncoded || item.content || item.description || '';
        const sanitizedContent = sanitizeContent(content);
        const excerpt = createExcerpt(sanitizedContent);

        return {
          source: source._id,
          title: item.title,
          link: item.link,
          guid: item.guid || item.link,
          pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
          content: sanitizedContent,
          excerpt,
          author: item.creator || item.author,
          categories: item.categories || [],
        };
      })
    );

    return items;
  } catch (error) {
    console.error(`Error fetching RSS feed for ${source.name}:`, error);
    throw error;
  }
}

// Main function to fetch all RSS feeds
export async function fetchAllRSSFeeds() {
  await connectDB();

  const sources = await RSSSource.find({ status: 'active' });
  let successCount = 0;
  let errorCount = 0;

  for (const source of sources) {
    try {
      const items = await fetchRSSFeed(source);

      // Update or create new items
      for (const item of items) {
        await RSSItem.findOneAndUpdate(
          { guid: item.guid },
          { ...item },
          { upsert: true, new: true }
        );
      }

      // Update source last fetch time
      await RSSSource.findByIdAndUpdate(source._id, {
        lastFetched: new Date(),
        lastError: null,
      });

      successCount++;
    } catch (error) {
      errorCount++;
      await RSSSource.findByIdAndUpdate(source._id, {
        lastError: error.message,
      });
    }
  }

  return { successCount, errorCount, total: sources.length };
}