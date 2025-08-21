import axios from "axios";
import { useState } from "react";
import { FaFacebook, FaGoogle, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_URL = "https://localhost:7295/api/users/login"; 

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

 const handleLogin = async (e) => {
  e.preventDefault();
  console.log("Login Attempt Payload:", credentials);
  try {
    const response = await axios.post(API_URL, {
      email: credentials.email,
      password: credentials.password 
    });
    console.log("API Response:", response.data); 
    if (response.status === 200) {
      localStorage.setItem("userToken", response.data.token);
      localStorage.setItem("userRole", response.data.role);
      setTimeout(() => {
        if (response.data.role === "Admin") {
          navigate("/");
        } else {
          navigate("/clientView");
        }
      }, 1500);
    } else {
      setMessage("Invalid email or password");
    }
  } catch (error) {
    console.error("Login Error:", error.response?.data); 
    setMessage(error.response?.data?.message || "Login failed");
  }
};


  return (
    <div style={styles.pageWrapper}>
      <div style={styles.background}></div>
      <div style={styles.card}>
        <h2 style={styles.title}>Mirë se u riktheve!</h2>
        <form style={styles.form} onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email Adresa" style={styles.input} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Fjalëkalimi" style={styles.input} onChange={handleChange} required />
          <button type="submit" style={styles.button}>Kyçu</button>
        </form>
        <p style={styles.message}>{message}</p>

        <div style={styles.socialWrapper}>
          <p style={styles.socialText}>Kyçu me:</p>
          <div style={styles.icons}>
            <FaFacebook style={styles.icon} />
            <FaGoogle style={styles.icon} />
            <FaInstagram style={styles.icon} />
            <FaLinkedin style={styles.icon} />
          </div>
        </div>

        <p style={styles.switchText}>
          Nuk keni llogari? <a href="/register" style={styles.buttonLink}>Regjistrohu</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(5px)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  card: {
    width: "600px",
    background: "rgba(219, 236, 228, 0.9)",
    padding: "60px",
    borderRadius: "25px",
    boxShadow: "0 12px 36px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    zIndex: 1,
    position: "relative",
  },
  title: {
    fontSize: "25px",
    marginBottom: "40px",
    color: "black",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  input: {
  padding: "8px 15px",
  borderRadius: "12px",
  border: "2px solid #ccc",
  fontSize: "20px",
  width: "100%",
  background: "rgba(0, 0, 0, 0.1)",
  color: "#fff",
  backdropFilter: "blur(4px)",
},

  button: {
    padding: "15px",
    backgroundColor: "#2c3e50",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    fontSize: "20px",
    cursor: "pointer",
    marginTop: "10px",
  },
  buttonLink: {
    display: "inline-block",
    marginLeft: "10px",
    padding: "10px 20px",
    backgroundColor: "#d4af37",
    color: "black",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  switchText: {
    marginTop: "30px",
    fontSize: "18px",
  },
  link: {
    color: "black",
    textDecoration: "none",
    fontWeight: "bold",
  },
  socialWrapper: {
    marginTop: "40px",
  },
  socialText: {
    marginBottom: "15px",
    fontWeight: "bold",
    fontSize: "18px",
  },
  icons: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    fontSize: "30px",
  },
  icon: {
    cursor: "pointer",
    color: "#333",
  },
  message: {
    color: "red",
    fontSize: "18px",
    marginTop: "20px",
  },
};

export default Login;