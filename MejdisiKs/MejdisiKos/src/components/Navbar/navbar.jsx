import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const links = [
  { path: "/", label: "Home" },
  { path: "/clientView", label: "Pamja Klienteve" },
  { path: "/aboutUs", label: "Rreth Nesh" },
  { path: "/recyclingCenter", label: "Qendrat e Riciklimit" },
  { path: "/greentip", label: "Këshilla" },
  { path: "/environmentalreport", label: "Raportet" },
  { path: "/vote", label: "Voto" },
  { path: "/comment", label: "Komente" },
  { path: "/contact", label: "Contact" }
];

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLinks = links.filter((link) =>
    link.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/aboutus">MejdisiIm</Link>
      </div>
      <div className="navbar-search">
  <input
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  {searchTerm && (
    <>
      <button
        className="clear-button"
        onClick={() => setSearchTerm("")}
        title="Pastro"
      >
        ×
      </button>
      <ul className="search-results">
        {filteredLinks.map((link) => (
          <li key={link.path}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </>
  )}
</div>

      <div className="navbar-auth">
        <Link to="/login" className="auth-btn login-btn">Hyr</Link>
        <Link to="/register" className="auth-btn register-btn">Regjistrohu</Link>
      </div>
    </nav>
  );
};

export default Navbar;