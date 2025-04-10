
import { getGroupedMeetings } from "@/services/mockData";
import RelevanceFilterTabs from "@/components/meetings/RelevanceFilterTabs";

export default function Inbox() {
  const { highRelevance, mediumRelevance, lowRelevance } = getGroupedMeetings();
  
  return (
    <div className="container py-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Meeting Inbox</h1>
      <p className="text-muted-foreground mb-6">
        AI-sorted meetings based on your role and project focus
      </p>
      
      <RelevanceFilterTabs
        highRelevance={highRelevance}
        mediumRelevance={mediumRelevance}
        lowRelevance={lowRelevance}
      />
    </div>
  );
}
