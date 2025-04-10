
import QuickStatsRow from "@/components/dashboard/QuickStatsRow";
import RoleInfo from "@/components/dashboard/RoleInfo";
import UpcomingMeetings from "@/components/dashboard/UpcomingMeetings";
import { meetings } from "@/services/mockData";

export default function Dashboard() {
  return (
    <div className="container py-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <QuickStatsRow />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <UpcomingMeetings meetings={meetings} />
        </div>
        <div>
          <RoleInfo />
        </div>
      </div>
    </div>
  );
}
