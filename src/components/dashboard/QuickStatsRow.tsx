
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Check, Clock, X } from "lucide-react";
import { meetings } from "@/services/mockData";

export default function QuickStatsRow() {
  const totalMeetings = meetings.length;
  const acceptedMeetings = meetings.filter(m => m.isAccepted).length;
  const declinedMeetings = meetings.filter(m => m.isDeclined).length;
  const pendingMeetings = totalMeetings - acceptedMeetings - declinedMeetings;
  
  // Calculate time saved by declining low relevance meetings
  const declinedMinutes = meetings
    .filter(m => m.isDeclined)
    .reduce((total, meeting) => total + meeting.duration, 0);
  
  const timeSaved = Math.round(declinedMinutes / 60);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Upcoming Meetings</CardDescription>
          <CardTitle className="text-2xl flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-primary" />
            {pendingMeetings}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Meetings awaiting your response
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Accepted</CardDescription>
          <CardTitle className="text-2xl flex items-center">
            <Check className="mr-2 h-5 w-5 text-green-500" />
            {acceptedMeetings}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Meetings you've accepted
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Declined</CardDescription>
          <CardTitle className="text-2xl flex items-center">
            <X className="mr-2 h-5 w-5 text-red-500" />
            {declinedMeetings}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Meetings you've declined
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Time Saved</CardDescription>
          <CardTitle className="text-2xl flex items-center">
            <Clock className="mr-2 h-5 w-5 text-primary" />
            {timeSaved} hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            By declining low relevance meetings
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
