import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin } from "lucide-react";
import type { Job } from "@/types/jobs";

const JobCard = ({ id, title, description, location, salary, status }: Job) => {
  return (
    <Link href={`/jobs/${id}`}>
      <Card className="group h-full cursor-pointer transition hover:shadow-lg">
        <CardHeader>
          <CardTitle className="line-clamp-1 text-lg group-hover:text-indigo-600">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="line-clamp-2 text-sm text-slate-600">{description}</p>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="h-4 w-4" />
            {location}
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Briefcase className="h-4 w-4" />${salary.toLocaleString()} / year
          </div>

          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            {status}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
};

export default JobCard;
