import { useState } from 'react';
import {
  FaAddressCard, FaBars,
  FaBell,
  FaCaretDown, FaCaretUp, FaCommentDots,
  FaFileAlt, FaHome, FaLeaf,
  FaLightbulb,
  FaRecycle,
  FaRocket,
  FaSignOutAlt, FaThList,
  FaUserAlt, FaUsers, FaVoteYea
} from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const toggleHomeDropdown = () => {
    setHomeDropdownOpen(!homeDropdownOpen);
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <div className="top-section">
        <button className="hamburger" onClick={toggleSidebar}>
          <FaBars />
        </button>
        {isOpen && <h2 className="sidebar-title">Navigimi</h2>}
      </div>

      <nav>
        <ul className="sidebar-links">
          {/* HOME DROPDOWN */}
          <li className="dropdown-toggle">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active dropdown-header' : 'dropdown-header'} onClick={(e) => { e.preventDefault();  toggleHomeDropdown();  navigate('/'); }} >
           <FaHome className="icon" />
          {isOpen && <span>Home</span>}
          {isOpen && (
          homeDropdownOpen ? <FaCaretUp className="dropdown-caret" /> : <FaCaretDown className="dropdown-caret" />
          )}
          </NavLink>
            {homeDropdownOpen && isOpen && (
              <ul className="dropdown-items">
                <li>
                  <NavLink to="/recyclingCenter" className={({ isActive }) => isActive ? 'active' : ''}>
                    <FaRecycle className="icon" />
                    <span>Qendrat e Riciklimit</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/greentip" className={({ isActive }) => isActive ? 'active' : ''}>
                    <FaLeaf className="icon" />
                    <span>Këshilla e Gjelbër</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/environmentalreport" className={({ isActive }) => isActive ? 'active' : ''}>
                    <FaFileAlt className="icon" />
                    <span>Raporte Mjedisore</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/reportCategory" className={({ isActive }) => isActive ? 'active' : ''}>
                    <FaThList className="icon" />
                    <span>Raporti Kategorik</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/vote" className={({ isActive }) => isActive ? 'active' : ''}>
                    <FaVoteYea className="icon" />
                    <span>Voto</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/comment" className={({ isActive }) => isActive ? 'active' : ''}>
                    <FaCommentDots className="icon" />
                    <span>Komente</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <NavLink to="/clientView" className={({ isActive }) => isActive ? 'active' : ''}>
              <FaUsers className="icon" />
              {isOpen && <span>Pamja Klienteve</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/aboutUs" className={({ isActive }) => isActive ? 'active' : ''}>
              <FaUserAlt className="icon" />
              {isOpen && <span>Rreth Nesh</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
              <FaAddressCard className="icon" />
              {isOpen && <span>Contact</span>}
            </NavLink>
          </li>




         <li>
    <div className="menu-item">
      <FaBell className="icon" />
      {isOpen && <span>Njoftimet</span>}
    </div>
  </li>

  <li>
    <div className="menu-item">
      <FaRocket className="icon" />
      {isOpen && <span>Fillo Udhëtimin</span>}
    </div>
  </li>

  <li>
    <div className="menu-item">
      <FaLeaf className="icon" />
      {isOpen && <span>Ekologjia</span>}
    </div>
  </li>

  <li>
    <div className="menu-item">
      <FaLightbulb className="icon" />
      {isOpen && <span>Idetë e Reja</span>}
    </div>
  </li>
        </ul>
      </nav>

      <div className="logout-section">
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt className="icon" />
          {isOpen && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
