
import { useState, useEffect } from "react";
import { getGroupedMeetings } from "@/services/mockData";
import RelevanceFilterTabs from "@/components/meetings/RelevanceFilterTabs";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Inbox() {
  const [groupedMeetings, setGroupedMeetings] = useState(() => getGroupedMeetings());
  const { toast } = useToast();

  const refreshMeetings = () => {
    setGroupedMeetings(getGroupedMeetings());
    toast({
      title: "Inbox refreshed",
      description: "Your meetings inbox has been refreshed."
    });
  };

  return (
    <div className="container py-6 max-w-4xl">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold">Meeting Inbox</h1>
        <Button 
          variant="outline" 
          onClick={refreshMeetings}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      <p className="text-muted-foreground mb-6">
        AI-sorted meetings based on your role and project focus
      </p>
      
      <RelevanceFilterTabs
        highRelevance={groupedMeetings.highRelevance}
        mediumRelevance={groupedMeetings.mediumRelevance}
        lowRelevance={groupedMeetings.lowRelevance}
        onRefresh={refreshMeetings}
      />
    </div>
  );
}
