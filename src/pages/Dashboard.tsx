
import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuickStatsRow from "@/components/dashboard/QuickStatsRow";
import RoleInfo from "@/components/dashboard/RoleInfo";
import UpcomingMeetings from "@/components/dashboard/UpcomingMeetings";
import { meetings } from "@/services/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { toast } = useToast();

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    toast({
      title: "Dashboard refreshed",
      description: "Your dashboard data has been refreshed."
    });
  };

  return (
    <div className="container py-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Dashboard
        </Button>
      </div>
      
      <QuickStatsRow key={`stats-${refreshKey}`} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <UpcomingMeetings key={`meetings-${refreshKey}`} meetings={meetings} />
        </div>
        <div>
          <RoleInfo />
        </div>
      </div>
    </div>
  );
}
