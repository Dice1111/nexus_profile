import { InfoBox } from "@/components/Box/InfoBox";
import { ConnectionChart } from "@/components/Chart/ConnectionChart";
import { VisitorChart } from "@/components/Chart/VisitorChart";

export default function Page() {
  const TotalViewCountData = {
    title: "View Count",
    description: " Total Profile Views",
    value: 1000,
  };
  const TotalContactSavedCountData = {
    title: "Contact Saved Count",
    description: "Total Contacts Saved",
    value: 23,
  };
  const TotalFollowerData = {
    title: "Follower Count",
    description: "Total followers",
    value: 78,
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="col-span-1 sm:col-span-2">
          <InfoBox data={TotalViewCountData} />
        </div>

        <div className=" col-span-1 sm:col-span-2 ">
          <InfoBox data={TotalContactSavedCountData} />
        </div>

        <div className="col-span-1  sm:col-span-2">
          <InfoBox data={TotalFollowerData} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {/* Connection Chart */}
        <div>
          <ConnectionChart />
        </div>

        {/* Visitor Chart */}
        <div>
          <VisitorChart />
        </div>
      </div>
    </>
  );
}
