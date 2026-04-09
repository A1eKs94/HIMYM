function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        backgroundColor: "#0f1724",
        borderBottom: "1px solid rgba(245, 200, 66, 0.15)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Title navbar */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "22px" }}>☂</span>
        <span style={{ fontSize: "18px", fontWeight: "500", color: "#ffffff" }}>
          HIMYM <span style={{ color: "#F5C842" }}>Tracker</span>
        </span>
      </div>

      {/* Active profile */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span style={{ fontSize: "13px", color: "#8fa8d0" }}>Tú & Amiga</span>
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            backgroundColor: "#1a2744",
            border: "1.5px solid #F5C842",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "500",
            color: "#F5C842",
          }}
        >
          TU
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
