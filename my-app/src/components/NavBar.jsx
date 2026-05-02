import React from "react";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      
      {/* LEFT */}
      <div style={styles.left}>
        <div style={styles.logo}>🛍️ ShopEase</div>

        <div style={styles.address}>
          <span style={styles.addressIcon}>📍</span>
          <div>
            <div style={styles.deliver}>Deliver to</div>
            <div style={styles.location}>Bhopal</div>
          </div>
        </div>
      </div>

      {/* CENTER */}
      <div style={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search for products..."
          style={styles.searchInput}
        />
        <button style={styles.searchBtn}>🔍</button>
      </div>

      {/* RIGHT */}
      <div style={styles.right}>
        <div style={styles.icon}>👤</div>

        <div style={styles.icon}>
          ❤️
          <span style={styles.badge}>2</span>
        </div>

        <div style={styles.icon}>
          🛒
          <span style={styles.badge}>3</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "#fff",
    borderBottom: "1px solid #eee",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  /* LEFT */
  left: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    width: "25%",
  },

  logo: {
    fontWeight: "bold",
    fontSize: "18px",
    whiteSpace: "nowrap",
  },

  address: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    cursor: "pointer",
  },

  addressIcon: {
    fontSize: "16px",
  },

  deliver: {
    fontSize: "10px",
    color: "#888",
  },

  location: {
    fontSize: "13px",
    fontWeight: "600",
  },

  /* CENTER */
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    width: "50%",
    background: "#f1f1f1",
    borderRadius: "6px",
    overflow: "hidden",
  },

  searchInput: {
    flex: 1,
    padding: "10px",
    border: "none",
    outline: "none",
    background: "transparent",
  },

  searchBtn: {
    padding: "10px 15px",
    background: "#000",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },

  /* RIGHT */
  right: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "20px",
    width: "25%",
  },

  icon: {
    position: "relative",
    fontSize: "18px",
    cursor: "pointer",
  },

  badge: {
    position: "absolute",
    top: "-5px",
    right: "-8px",
    background: "red",
    color: "#fff",
    fontSize: "10px",
    borderRadius: "50%",
    padding: "2px 5px",
  },
};