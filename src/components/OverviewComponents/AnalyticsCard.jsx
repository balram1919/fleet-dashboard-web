import { ViewHeight, ViewWidth } from "@/constants/resDiv";

const AnalyticsCard= () => {
  return (
    <div
      style={{
        height: ViewHeight(318),
        width: ViewWidth(357),
        background: "#FFFFFF", // optional readable card
        borderRadius: ViewWidth(14),
        boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
      }}
    ></div>
  );
};

export default AnalyticsCard;
