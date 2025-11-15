import { ViewHeight, ViewWidth } from "@/lib/constants";

export function Button({ title = "Login", onPress }) {
    return (
      <button
        onClick={onPress}
        style={{
          backgroundColor: "#FF3F7F",
          color: "#FFFFFF",
          height: ViewHeight(64),
          width: ViewWidth(161),
          borderRadius: ViewWidth(100),
          fontWeight: "600",
          fontSize: ViewWidth(20),
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {title}
      </button>
    );
  }
  