import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Products</h3>
            <Link href="/products?category=sound-systems" className="text-sm text-muted-foreground">
              Sound Systems
            </Link>
            <Link href="/products?category=lighting-systems" className="text-sm text-muted-foreground">
              Lighting Systems
            </Link>
            <Link href="/products?category=event-gear" className="text-sm text-muted-foreground">
              Event Gear
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <Link href="/news" className="text-sm text-muted-foreground">
              News
            </Link>
            <Link href="/events" className="text-sm text-muted-foreground">
              Events
            </Link>
            <Link href="/blog" className="text-sm text-muted-foreground">
              Blog
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <Link href="/about" className="text-sm text-muted-foreground">
              About
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground">
              Privacy Policy
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to get the latest updates
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-md border px-3 py-2 text-sm"
              />
              <button className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} NerlumaHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}