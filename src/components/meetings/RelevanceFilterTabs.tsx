
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Meeting } from "@/types";
import MeetingCard from "./MeetingCard";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

type RelevanceFilterTabsProps = {
  highRelevance: Meeting[];
  mediumRelevance: Meeting[];
  lowRelevance: Meeting[];
  onRefresh?: () => void;
};

export default function RelevanceFilterTabs({
  highRelevance,
  mediumRelevance,
  lowRelevance,
  onRefresh
}: RelevanceFilterTabsProps) {
  const [activeTab, setActiveTab] = useState("high");
  const [pendingHigh, setPendingHigh] = useState<Meeting[]>([]);
  const [pendingMedium, setPendingMedium] = useState<Meeting[]>([]);
  const [pendingLow, setPendingLow] = useState<Meeting[]>([]);

  useEffect(() => {
    // Filter meetings that are not accepted, declined, or archived
    setPendingHigh(highRelevance.filter(m => !m.isAccepted && !m.isDeclined && !m.isArchived));
    setPendingMedium(mediumRelevance.filter(m => !m.isAccepted && !m.isDeclined && !m.isArchived));
    setPendingLow(lowRelevance.filter(m => !m.isAccepted && !m.isDeclined && !m.isArchived));
  }, [highRelevance, mediumRelevance, lowRelevance]);

  const handleMeetingStatusChange = () => {
    // Re-filter meetings after status change
    setPendingHigh(highRelevance.filter(m => !m.isAccepted && !m.isDeclined && !m.isArchived));
    setPendingMedium(mediumRelevance.filter(m => !m.isAccepted && !m.isDeclined && !m.isArchived));
    setPendingLow(lowRelevance.filter(m => !m.isAccepted && !m.isDeclined && !m.isArchived));
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
    handleMeetingStatusChange();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Tabs
          defaultValue="high"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="high" className="relative">
              Relevant
              {pendingHigh.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {pendingHigh.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="medium" className="relative">
              Optional
              {pendingMedium.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {pendingMedium.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="low" className="relative">
              Not Applicable
              {pendingLow.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {pendingLow.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="high" className="mt-0 space-y-4">
            {highRelevance.length > 0 ? (
              highRelevance.map((meeting) => (
                <MeetingCard 
                  key={meeting.id} 
                  meeting={meeting} 
                  onStatusChange={handleMeetingStatusChange}
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No relevant meetings found.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="medium" className="mt-0 space-y-4">
            {mediumRelevance.length > 0 ? (
              mediumRelevance.map((meeting) => (
                <MeetingCard 
                  key={meeting.id} 
                  meeting={meeting} 
                  onStatusChange={handleMeetingStatusChange}
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No optional meetings found.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="low" className="mt-0 space-y-4">
            {lowRelevance.length > 0 ? (
              lowRelevance.map((meeting) => (
                <MeetingCard 
                  key={meeting.id} 
                  meeting={meeting} 
                  onStatusChange={handleMeetingStatusChange}
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No meetings marked as 'Not Applicable'.
              </div>
            )}
          </TabsContent>
        </Tabs>
        <Button 
          variant="outline" 
          size="icon" 
          className="ml-2" 
          onClick={handleRefresh}
          title="Refresh meetings"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
