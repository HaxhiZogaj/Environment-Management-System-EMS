import axios from "axios";
import { useState } from "react";
import { FaFacebook, FaGoogle, FaInstagram, FaLinkedin } from "react-icons/fa";

const API_URL = "https://localhost:7295/api/users/register"; 

const Register = () => {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "",role: "Customer"
 });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setMessage("User registered successfully! You can now login.");
    } catch (error) {
      setMessage(error.response.data.message || "Registration failed");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.background}></div>
      <div style={styles.card}>
        <h2 style={styles.title}>Regjistrohu</h2>
        <form style={styles.form} onSubmit={handleRegister}>
          <input type="text" name="fullName" placeholder="Emri i Plotë" style={styles.input} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Adresa" style={styles.input} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Fjalëkalimi" style={styles.input} onChange={handleChange} required />
          <button type="submit" style={styles.button}>Regjistrohu</button>
        </form>
        <p style={styles.message}>{message}</p>

        <div style={styles.socialWrapper}>
          <p style={styles.socialText}>Regjistrohu me:</p>
          <div style={styles.icons}>
            <FaFacebook style={styles.icon} />
            <FaGoogle style={styles.icon} />
            <FaInstagram style={styles.icon} />
            <FaLinkedin style={styles.icon} />
          </div>
        </div>
        <p style={styles.switchText}>
          Keni një llogari? <a href="/login" style={styles.buttonLink}>Kyçu</a>
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
        background: "rgba(207, 231, 219, 0.9)", 
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
    passwordWrapper: {
        position: "relative",
        width: "100%",
      },
      eyeIcon: {
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        cursor: "pointer",
        color: "#888",
      },
};

export default Register;
