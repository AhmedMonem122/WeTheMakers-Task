import { Card, CardContent } from "@/components/ui/card";
import { FileText, Mail, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AdminApplication } from "@/types/admin-applications";

type Props = {
  application: AdminApplication;
};

export default function ApplicationCard({ application }: Props) {
  return (
    <Card className="transition hover:shadow-md">
      <CardContent className="space-y-4 p-5">
        {/* Job title */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{application?.job?.title}</h3>
          <Badge variant="secondary">{application?.status}</Badge>
        </div>

        {/* User */}
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            {application?.user?.fullName}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            {application?.user?.email}
          </div>
        </div>

        {/* Resume */}
        <div className="flex items-center gap-2 text-sm">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Resume:</span>
          <span className="text-muted-foreground">
            {application?.resumeText}
          </span>
        </div>

        {/* Cover letter */}
        <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
          {application?.coverLetter}
        </div>

        <p className="text-xs text-muted-foreground">
          Submitted on {new Date(application?.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
