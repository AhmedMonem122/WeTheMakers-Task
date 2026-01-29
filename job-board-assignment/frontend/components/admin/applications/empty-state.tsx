import { Inbox } from "lucide-react";

export default function EmptyApplications() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-12 text-center">
      <Inbox className="h-10 w-10 text-muted-foreground" />
      <h3 className="text-lg font-semibold">No applications yet</h3>
      <p className="text-sm text-muted-foreground">
        Applications submitted by job seekers will appear here.
      </p>
    </div>
  );
}
