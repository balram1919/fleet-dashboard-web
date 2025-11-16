export default function Loading({ fullScreen = false }) {
  return (
    <div style={fullScreen ? styles.fullScreen : styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Loading...</p>
    </div>
  );
}

const styles = {
  fullScreen: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    backdropFilter: "blur(4px)",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #ddd",
    borderTopColor: "#7b4fff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  text: {
    marginTop: "12px",
    color: "#7b4fff",
    fontSize: "16px",
    fontWeight: "500",
  },
};
