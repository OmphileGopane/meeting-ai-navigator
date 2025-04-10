
import { useState, useEffect } from "react";
import { getMeetingsByStatus } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MeetingCard from "@/components/meetings/MeetingCard";
import { Meeting } from "@/types";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Archives() {
  const [archivedMeetings, setArchivedMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadArchivedMeetings = () => {
    setLoading(true);
    const archived = getMeetingsByStatus({ isArchived: true });
    setArchivedMeetings(archived);
    setLoading(false);
  };

  useEffect(() => {
    loadArchivedMeetings();
  }, []);

  const handleRefresh = () => {
    loadArchivedMeetings();
    toast({
      title: "Archives refreshed",
      description: "Your archived meetings have been refreshed."
    });
  };

  const handleStatusChange = () => {
    loadArchivedMeetings();
  };

  return (
    <div className="container py-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Archives</h1>
          <p className="text-muted-foreground">
            View your archived meetings and restore them if needed
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-pulse-slow">Loading archived meetings...</div>
        </div>
      ) : archivedMeetings.length > 0 ? (
        <div className="space-y-4">
          {archivedMeetings.map(meeting => (
            <MeetingCard 
              key={meeting.id} 
              meeting={meeting} 
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-medium mb-2">No archived meetings</h2>
            <p className="text-muted-foreground mb-4">
              When you archive meetings, they will appear here
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
