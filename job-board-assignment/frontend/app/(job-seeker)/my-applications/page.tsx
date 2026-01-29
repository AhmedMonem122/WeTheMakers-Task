import { ApplicationsList } from "@/components/applications/applications-list";

export default function MyApplicationsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">My Applications</h1>
      <ApplicationsList />
    </div>
  );
}
