
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Meeting } from "@/types";
import { Calendar, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MeetingCard from "../meetings/MeetingCard";

type UpcomingMeetingsProps = {
  meetings: Meeting[];
};

export default function UpcomingMeetings({ meetings }: UpcomingMeetingsProps) {
  const navigate = useNavigate();
  const upcomingMeetings = meetings
    .filter(m => !m.isDeclined && !m.isArchived)
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
    .slice(0, 3);

  const handleViewAll = () => {
    navigate("/inbox");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Upcoming Meetings
        </CardTitle>
        <CardDescription>
          Your next meetings, prioritized by relevance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingMeetings.length > 0 ? (
          upcomingMeetings.map(meeting => (
            <MeetingCard key={meeting.id} meeting={meeting} compact />
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No upcoming meetings found.
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={handleViewAll}>
          View All Meetings
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
