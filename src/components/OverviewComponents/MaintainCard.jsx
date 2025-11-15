import { ViewHeight, ViewWidth } from "@/constants/resDiv";

const MaintainCard = () => {
  return (
    <div
      style={{
        height: ViewHeight(454),
        width: ViewWidth(445),
        background: "#FFFFFF", // optional readable card
        borderRadius: ViewWidth(14),
        boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
      }}
    ></div>
  );
};

export default MaintainCard;
