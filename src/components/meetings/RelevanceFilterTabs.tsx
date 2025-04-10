
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Meeting } from "@/types";
import MeetingCard from "./MeetingCard";

type RelevanceFilterTabsProps = {
  highRelevance: Meeting[];
  mediumRelevance: Meeting[];
  lowRelevance: Meeting[];
};

export default function RelevanceFilterTabs({
  highRelevance,
  mediumRelevance,
  lowRelevance,
}: RelevanceFilterTabsProps) {
  const [activeTab, setActiveTab] = useState("high");

  return (
    <Tabs
      defaultValue="high"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="high" className="relative">
          Relevant
          {highRelevance.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {highRelevance.length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="medium" className="relative">
          Optional
          {mediumRelevance.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {mediumRelevance.length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="low" className="relative">
          Not Applicable
          {lowRelevance.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {lowRelevance.length}
            </span>
          )}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="high" className="mt-0 space-y-4">
        {highRelevance.length > 0 ? (
          highRelevance.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
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
            <MeetingCard key={meeting.id} meeting={meeting} />
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
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No meetings marked as 'Not Applicable'.
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
