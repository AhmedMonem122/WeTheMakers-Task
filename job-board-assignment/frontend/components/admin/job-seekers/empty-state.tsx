import { Users } from "lucide-react";

export default function EmptyJobSeekers() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-12 text-center">
      <Users className="h-10 w-10 text-muted-foreground" />
      <h3 className="text-lg font-semibold">No job seekers found</h3>
      <p className="text-sm text-muted-foreground">
        There are currently no registered job seekers.
      </p>
    </div>
  );
}
