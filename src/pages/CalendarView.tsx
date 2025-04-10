
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Meeting } from "@/types";
import { format } from "date-fns";
import { meetings as allMeetings } from "@/services/mockData";
import { useToast } from "@/hooks/use-toast";

export default function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Filter meetings for selected date and status
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      
      // Get meetings for this date that are accepted (not declined or archived)
      const filteredMeetings = allMeetings.filter(meeting => {
        const meetingDate = format(new Date(meeting.dateTime), 'yyyy-MM-dd');
        return meetingDate === formattedDate && meeting.isAccepted && !meeting.isDeclined && !meeting.isArchived;
      });
      
      setMeetings(filteredMeetings);
    }
  }, [date, refreshKey, allMeetings]);

  // Function to get meeting dates for highlighting on calendar
  const getMeetingDates = () => {
    // Get only accepted meetings
    const acceptedMeetings = allMeetings.filter(meeting => 
      meeting.isAccepted && !meeting.isDeclined && !meeting.isArchived
    );
    
    return acceptedMeetings.map(meeting => new Date(meeting.dateTime));
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    toast({
      title: "Calendar refreshed",
      description: "Your calendar data has been refreshed."
    });
  };

  return (
    <div className="container py-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Calendar
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Your Schedule</CardTitle>
            <CardDescription>Select a date to view meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              // Highlight dates with meetings
              modifiers={{
                meetingDay: getMeetingDates(),
              }}
              modifiersClassNames={{
                meetingDay: 'bg-primary/20 font-bold',
              }}
            />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {date && format(date, 'MMMM d, yyyy')} Meetings
            </CardTitle>
            <CardDescription>
              Showing accepted meetings for this date
            </CardDescription>
          </CardHeader>
          <CardContent>
            {meetings.length > 0 ? (
              <div className="space-y-4">
                {meetings.map((meeting) => (
                  <div key={meeting.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{meeting.subject}</h3>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(meeting.dateTime), 'h:mm a')} - 
                          {format(new Date(new Date(meeting.dateTime).getTime() + meeting.duration * 60000), 'h:mm a')}
                        </p>
                        <p className="text-sm mt-1">{meeting.location}</p>
                      </div>
                      <Badge variant="outline" className={`relevance-${meeting.relevanceScore}-pill`}>
                        {meeting.relevanceScore === 'high' ? 'Relevant' : 
                         meeting.relevanceScore === 'medium' ? 'Optional' : 'Not Applicable'}
                      </Badge>
                    </div>
                    <div className="mt-2 text-sm">
                      <p className="line-clamp-2">{meeting.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Alert>
                <AlertTitle>No meetings found</AlertTitle>
                <AlertDescription>
                  There are no accepted meetings scheduled for this date.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
