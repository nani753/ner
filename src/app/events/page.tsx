import { Metadata } from "next";
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Events - NerlumaHub",
  description: "Upcoming events and activities from NerlumaHub",
};

async function getEvents() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/events`, {
      next: { revalidate: 3600 }, // Revalidate every hour
      cache: 'force-cache',
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });
    if (!res.ok) throw new Error('Failed to fetch events');
    return res.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-8">Events</h1>
      {events.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No upcoming events found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Calendar sidebar */}
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center space-x-2 text-muted-foreground mb-4">
              <Calendar className="h-5 w-5" />
              <span>Upcoming Events</span>
            </div>
            <div className="space-y-4">
              {events.map((event: any) => {
                const startDate = new Date(event.dateTime.start);
                return (
                  <div
                    key={event._id}
                    className="flex items-center space-x-4 rounded-lg border p-4 hover:shadow-sm transition-shadow cursor-pointer"
                  >
                    <div className="flex-shrink-0 text-center">
                      <div className="text-sm font-medium">
                        {startDate.toLocaleString('default', { month: 'short' }).toUpperCase()}
                      </div>
                      <div className="text-2xl font-bold">{startDate.getDate()}</div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {event.location.venue}, {event.location.city}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Events details */}
          <div className="grid gap-6">
            {events.map((event: any) => (
              <div
                key={event._id}
                className="rounded-lg border bg-card text-card-foreground hover:shadow-md transition-shadow"
              >
                {event.heroImage && (
                  <div className="aspect-[21/9] relative rounded-t-lg overflow-hidden">
                    <img
                      src={event.heroImage}
                      alt={event.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <span className="text-sm px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {event.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(event.dateTime.start).toLocaleDateString()} -{' '}
                        {new Date(event.dateTime.end).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Location:</span>
                      <span>{event.location.venue}, {event.location.city}, {event.location.country}</span>
                    </div>
                    {event.registrationLink && (
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline mt-2"
                      >
                        Register Now →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}