import { ViewHeight, ViewWidth } from "@/constants/resDiv";

const ActiveBikes = () => {
  return (
    <div
      style={{
        height: ViewHeight(318),
        width: ViewWidth(786),
        background: "#FFFFFF", // optional readable card
        borderRadius: ViewWidth(14),
        boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
      }}
    ></div>
  );
};

export default ActiveBikes;
