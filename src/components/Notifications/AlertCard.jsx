"use client";

export default function AlertCard({ item, handelViewStatus }) {
  const date = new Date(item.startTime);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const severityColor = {
    Confirmed: "text-green-600",
    High: "text-red-600",
    Medium: "text-yellow-600",
    Low: "text-blue-600",
    Waiting: "text-orange-500",
  };

  const statusColor = {
    Confirmed: "text-green-600",
    Waiting: "text-yellow-600",
    Resolved: "text-blue-600",
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border mb-4 hover:shadow-md transition">
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>User/Bike ID</span>
        <div className="flex gap-4">
          <span>Time: {formattedTime}</span>
          <span>Date: {formattedDate}</span>
        </div>
      </div>

      <div className="mt-1 text-lg font-semibold text-gray-900">
        {item.asset?.name || "Unknown User"}
      </div>

      <div className="flex items-center gap-4 text-sm mt-1">
        <span className="font-medium">Status:</span>
        <span className={`${statusColor[item.status] || "text-gray-500"} font-semibold`}>
          {item.status}
        </span>

        <span className="font-medium ml-4">Severity:</span>
        <span className={`${severityColor[item.severity] || "text-gray-500"} font-semibold`}>
          {item.severity}
        </span>
      </div>

      <div className="text-sm mt-2 text-gray-600">
        Location:{" "}
        {item?.extra?.geoLocationData?.formatted || "Location not available"}
      </div>

      <div className="mt-3">
        <button className="px-4 py-2 rounded-lg text-blue-600 border border-blue-400 hover:bg-blue-50" onClick={() => {
          handelViewStatus({ lon: item?.extra?.geoLocationData?.geometry?.lng, lat: item?.extra?.geoLocationData?.geometry?.lat })
        }}>
          View Status
        </button>
      </div>
    </div>
  );
}
