import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Application } from "@/types/applications";

export function ApplicationCard({ app }: { app: Application }) {
  return (
    <Link href={`/jobs/${app.jobId}`}>
      <Card className="hover:shadow-lg transition cursor-pointer">
        <CardContent className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{app.job.title}</h3>
            <Badge variant="outline">{app.status}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Resume: {app.resumeText}
          </p>
          <p className="text-xs text-muted-foreground">
            Applied on {new Date(app.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
