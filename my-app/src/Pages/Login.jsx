import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../features/auth/authAPI";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const res = await loginAPI(form);

      console.log("Login Response:", res);

      // ✅ Example: store token (if backend sends it)
      if (res.access_token) {
        localStorage.setItem("token", res.access_token);
      }

      // ✅ Redirect after login
      navigate("/users");

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://127.0.0.1:8000/login/google";
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>

        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div style={styles.divider}>OR</div>

        <button
          type="button"
          style={styles.googleBtn}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #4f46e5, #9333ea)",
  },
  card: {
    width: "350px",
    padding: "30px",
    borderRadius: "16px",
    background: "#fff",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  googleBtn: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
  },
  divider: {
    textAlign: "center",
    margin: "10px 0",
    color: "#999",
  },
  error: {
    color: "red",
    marginTop: "10px",
    textAlign: "center",
  },
};