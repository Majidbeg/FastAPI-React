import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupAPI } from "../features/auth/authAPI";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const res = await signupAPI(form);

      console.log("Signup Response:", res);

      setSuccess(res.message || "Signup successful");

      // ✅ Redirect after success
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.title}>Create Account 🚀</h2>

        <input
          placeholder="Name"
          style={styles.input}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
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
          {loading ? "Signing up..." : "Signup"}
        </button>

        {/* ✅ Success message */}
        {success && <p style={styles.success}>{success}</p>}

        {/* ❌ Error message */}
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

export default Signup;

const styles = { container: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #10b981, #3b82f6)", }, card: { width: "350px", padding: "30px", borderRadius: "16px", background: "#fff", boxShadow: "0 15px 40px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", }, title: { textAlign: "center", marginBottom: "20px", }, input: { padding: "12px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ddd", }, button: { padding: "12px", borderRadius: "8px", border: "none", background: "#10b981", color: "#fff", fontWeight: "bold", cursor: "pointer", }, error: { color: "red", marginTop: "10px", textAlign: "center", }, };