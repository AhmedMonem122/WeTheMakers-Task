import { Card, CardContent } from "@/components/ui/card";
import { Mail, User } from "lucide-react";
import { User as UserType } from "@/types/users";
type Props = {
  user: UserType;
};

export default function JobSeekerCard({ user }: Props) {
  return (
    <Card className="transition hover:shadow-md">
      <CardContent className="space-y-3 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{user.fullName}</p>
            <p className="text-sm text-muted-foreground">Job Seeker</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          {user.email}
        </div>

        <p className="text-xs text-muted-foreground">
          Joined {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
