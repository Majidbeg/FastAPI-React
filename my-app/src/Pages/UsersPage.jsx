import React from "react";

function HeaderPage() {
  return (
    <div>
      <header style={styles.header}>
        {/* Left: Logo */}
        <div style={styles.left}>
          <span style={styles.logo}>🛍️</span>
        </div>

        {/* Center: Search */}
        <div style={styles.center}>
          <input
            type="text"
            placeholder="Search products..."
            style={styles.search}
          />
        </div>

        {/* Right: Icons */}
        <div style={styles.right}>
          <span style={styles.icon}>👤</span>
          <span style={styles.icon}>❤️</span>
          <span style={styles.icon}>🛒</span>
        </div>
      </header>

      {/* Page Content */}
      <div style={styles.body}>
        <h2>Welcome to Main Page 🚀</h2>
      </div>
    </div>
  );
}

export default HeaderPage;

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "#ffffff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  left: {
    flex: 1,
  },

  logo: {
    fontSize: "24px",
    cursor: "pointer",
  },

  center: {
    flex: 2,
    display: "flex",
    justifyContent: "center",
  },

  search: {
    width: "70%",
    padding: "10px 15px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    outline: "none",
  },

  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    gap: "15px",
  },

  icon: {
    fontSize: "20px",
    cursor: "pointer",
  },

  body: {
    padding: "20px",
  },
};