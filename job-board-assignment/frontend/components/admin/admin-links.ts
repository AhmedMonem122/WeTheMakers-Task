import { Briefcase, Users, FileText } from "lucide-react";

export const adminLinks = [
  {
    label: "Jobs",
    href: "/dashboard/jobs",
    icon: Briefcase,
  },
  {
    label: "Job Seekers",
    href: "/dashboard/job-seekers",
    icon: Users,
  },
  {
    label: "Applications",
    href: "/dashboard/applications",
    icon: FileText,
  },
];
