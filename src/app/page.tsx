import Image from 'next/image';import Image from 'next/image';

import Link from 'next/link';import Link from 'next/link';

import { Layout } from '@/components/layout';import { Layout } from '@/components/layout';

import { Button } from '@/components/ui/button';import { Button } from '@/components/ui/button';



export default function Home() {export default function Home() {

  return (  return (

    <Layout>    <Layout>

      <main className="flex min-h-screen flex-col items-center px-4 py-12 md:py-24">      <main className="flex min-h-screen flex-col items-center px-4 py-12 md:py-24">

        <div className="container mx-auto max-w-6xl">        <div className="container mx-auto max-w-6xl">

          {/* Hero Section */}          {/* Hero Section */}

          <div className="mb-16 text-center">          <div className="mb-16 text-center">

            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">

              Welcome to NerlumaHub              Welcome to NerlumaHub

            </h1>            </h1>

            <p className="mb-8 text-xl text-muted-foreground">            <p className="mb-8 text-xl text-muted-foreground">

              Your premier destination for event technology solutions              Your premier destination for event technology solutions

            </p>            </p>

            <div className="flex justify-center gap-4">            <div className="flex justify-center gap-4">

              <Link href="/products">              <Link href="/products">

                <Button size="lg">Browse Products</Button>                <Button size="lg">Browse Products</Button>

              </Link>              </Link>

              <Link href="/admin">              <Link href="/admin">

                <Button size="lg" variant="outline">Admin Portal</Button>                <Button size="lg" variant="outline">Admin Portal</Button>

              </Link>              </Link>

            </div>            </div>

          </div>          </div>



          {/* Features Grid */}          {/* Features Grid */}

          <div className="grid gap-8 md:grid-cols-3">          <div className="grid gap-8 md:grid-cols-3">

            <div className="rounded-lg border p-6">            <div className="rounded-lg border p-6">

              <h3 className="mb-3 text-xl font-semibold">Sound Systems</h3>              <h3 className="mb-3 text-xl font-semibold">Sound Systems</h3>

              <p className="text-muted-foreground">              <p className="text-muted-foreground">

                Professional audio equipment for every venue size and budget                Professional audio equipment for every venue size and budget

              </p>              </p>

            </div>            </div>

            <div className="rounded-lg border p-6">            <div className="rounded-lg border p-6">

              <h3 className="mb-3 text-xl font-semibold">Lighting Solutions</h3>              <h3 className="mb-3 text-xl font-semibold">Lighting Solutions</h3>

              <p className="text-muted-foreground">              <p className="text-muted-foreground">

                State-of-the-art lighting systems for unforgettable events                State-of-the-art lighting systems for unforgettable events

              </p>              </p>

            </div>            </div>

            <div className="rounded-lg border p-6">            <div className="rounded-lg border p-6">

              <h3 className="mb-3 text-xl font-semibold">Event Tech</h3>              <h3 className="mb-3 text-xl font-semibold">Event Tech</h3>

              <p className="text-muted-foreground">              <p className="text-muted-foreground">

                Complete technology solutions for modern events                Complete technology solutions for modern events

              </p>              </p>

            </div>            </div>

          </div>          </div>

        </div>        </div>

      </main>      </main>

    </Layout>    </Layout>

  );  );

}}
    </div>
  );
}
