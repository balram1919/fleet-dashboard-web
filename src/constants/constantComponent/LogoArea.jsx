import { ViewHeight, ViewWidth } from "@/constants/resDiv";
import  logoUrl from "../../assests/FleetLogo.png";
const LogoArea = () => {
  return (
    <div
      style={{
        height: ViewHeight(41),
        width: ViewWidth(165),
         // optional readable card
      }}
    >
       <img
        src={logoUrl}
        alt="Fleet Logo"
        style={{ height: "100%", width: "auto", objectFit: "contain" }}
      />
      
    </div>
  );
};

export default LogoArea;
