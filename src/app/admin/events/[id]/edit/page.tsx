import { AdminLayout } from "@/components/layout/admin-layout";
import { EventForm } from "@/components/events/event-form";
import { requireAdmin } from "@/lib/auth-utils";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Event | Admin Dashboard",
  description: "Edit an existing event",
};

async function getEvent(id: string) {
  await requireAdmin();
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/events/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function EditEventPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await getEvent(params.id);
  if (!event) notFound();

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Edit Event</h1>
        <p className="text-sm text-muted-foreground">
          Edit an existing event in the calendar
        </p>
      </div>

      <EventForm event={event} />
    </AdminLayout>
  );
}