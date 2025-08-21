import { registerLicense } from "@syncfusion/ej2-base";
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-react-grids/styles/material.css';
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-dropdowns/styles/material.css";

import { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import Footer from './components/Footer/footer';
import Login from './components/Login-Register/login';
import Register from './components/Login-Register/register';
import Navbar from './components/Navbar/navbar';
import Sidebar from './components/Sidebar/sidebar';
import Unauthorized from './components/Unauthorized/unauthorized';
import AboutUs from './pages/AboutUs/aboutUs';
import ClientView from './pages/ClientView/clientView';
import Comment from './pages/Comment/comment';
import Contact from './pages/Contact/contact';
import EnvironmentalReport from './pages/EnvironmentalReport/environmentalReport';
import GreenTip from './pages/GreenTip/greenTip';
import Home from './pages/Home/home';
import RecyclingCenter from './pages/RecyclingCenter/recyclingCenter';
import ReportCategory from "./pages/ReportCategory/reportCategory";
import Vote from './pages/Vote/vote';

registerLicense("Ngo9BigBOggjHTQxAR8/V1NNaF5cXmBCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWXpec3VTRGVeVkd2WkRWYUA=");

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

    const PrivateRoute = ({ element, allowedRoles }) => {
    const role = localStorage.getItem("userRole");
    return allowedRoles.includes(role) ? element : <Navigate to="/unauthorized" />;
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
          <Navbar />
          <div className="content-body">
            <Routes>
              <Route path="/" element={<PrivateRoute element={<Home />} allowedRoles={["Admin"]} />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/recyclingCenter" element={<PrivateRoute element={<RecyclingCenter />} allowedRoles={["Admin"]} />} /> 
              <Route path="/reportCategory" element={<PrivateRoute element={<ReportCategory />} allowedRoles={["Admin"]} />} />
              <Route path="/greenTip" element={<PrivateRoute element={<GreenTip />} allowedRoles={["Admin"]} />} />
              <Route path="/environmentalReport" element={<PrivateRoute element={<EnvironmentalReport />} allowedRoles={["Admin"]} />} />
              <Route path="/vote" element={<PrivateRoute element={<Vote />} allowedRoles={["Admin"]} />} />
              <Route path="/comment" element={<PrivateRoute element={<Comment/>} allowedRoles={["Admin"]} />} /> 
              <Route path="/contact" element={<Contact />} /> 
              <Route path="/login" element={<Login />} /> 
              <Route path="/register" element={<Register />} /> 
              <Route path="/unauthorized" element={<Unauthorized/>} /> 
              <Route path="/clientView" element={<ClientView/>} /> 
            </Routes>
          </div>
          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;
