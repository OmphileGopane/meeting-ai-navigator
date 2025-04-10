
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCog } from "lucide-react";
import { currentUser } from "@/services/mockData";

export default function RoleInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <UserCog className="mr-2 h-5 w-5" />
          Role & Project Profile
        </CardTitle>
        <CardDescription>
          This information is used by the AI to determine meeting relevance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-1">Current Role</h4>
          <p className="text-muted-foreground">{currentUser.role}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Teams</h4>
          <div className="flex flex-wrap gap-1">
            {currentUser.teams.map(team => (
              <Badge key={team} variant="secondary">
                {team}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Active Projects</h4>
          <div className="flex flex-wrap gap-1">
            {currentUser.projects.map(project => (
              <Badge key={project} variant="outline" className="bg-primary/5">
                {project}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Update Role Settings
        </Button>
      </CardFooter>
    </Card>
  );
}
