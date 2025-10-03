import { AdminLayout } from "@/components/layout/admin-layout";
import { EventForm } from "@/components/events/event-form";

export const metadata = {
  title: "New Event | Admin Dashboard",
  description: "Create a new event",
};

export default function NewEventPage() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">New Event</h1>
        <p className="text-sm text-muted-foreground">
          Create a new event in the calendar
        </p>
      </div>

      <EventForm />
    </AdminLayout>
  );
}