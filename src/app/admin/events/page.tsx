import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requireAdmin } from "@/lib/auth-utils";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export const metadata = {
  title: "Manage Events | Admin Dashboard",
  description: "Manage events and calendar",
};

async function getEvents() {
  await requireAdmin();
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/events`, {
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Events</h1>
          <p className="text-sm text-muted-foreground">
            Manage your events calendar
          </p>
        </div>
        <Link href="/admin/events/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Events</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event: any) => (
                <TableRow key={event._id}>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "rounded-full px-2 py-1 text-xs",
                        event.status === "upcoming"
                          ? "bg-blue-100 text-blue-700"
                          : event.status === "ongoing"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      )}
                    >
                      {event.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {format(new Date(event.dateTime.start), "PPP")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(event.dateTime.end), "PPP")}
                  </TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/events/${event._id}/edit`}>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}