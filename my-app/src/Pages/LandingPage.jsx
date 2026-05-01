import { Link } from "react-router-dom";

function HomePage() {
  const handleGoogleLogin = () => {
    // Backend OAuth endpoint
    window.location.href = "http://localhost:8000/api/login/github";
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome 👋</h1>
        <p style={styles.subtitle}>
          Manage users, signup, and login easily
        </p>

        <div style={styles.buttonGroup}>
          <Link to="/users" style={styles.link}>
            <button style={styles.primaryBtn}>View Users</button>
          </Link>

          <Link to="/signup" style={styles.link}>
            <button style={styles.secondaryBtn}>Signup</button>
          </Link>

          <Link to="/login" style={styles.link}>
            <button style={styles.outlineBtn}>Login</button>
          </Link>

          {/* Divider */}
          <div style={styles.divider}>OR</div>

          {/* Google Login */}
          <button style={styles.googleBtn} onClick={handleGoogleLogin}>
            login with Github
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #4f46e5, #9333ea)",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
    textAlign: "center",
    width: "350px",
  },
  title: {
    marginBottom: "10px",
    fontSize: "28px",
  },
  subtitle: {
    color: "#666",
    marginBottom: "30px",
    fontSize: "14px",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  link: {
    textDecoration: "none",
  },
  primaryBtn: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
  },
  secondaryBtn: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#10b981",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
  },
  outlineBtn: {
    padding: "12px",
    borderRadius: "8px",
    border: "2px solid #4f46e5",
    background: "transparent",
    color: "#4f46e5",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
  },
  googleBtn: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
  },
  divider: {
    textAlign: "center",
    margin: "10px 0",
    color: "#999",
    fontSize: "12px",
  },
};