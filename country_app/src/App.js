import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CountryListPage from "./components/CountryListPage";
import CountryDetailPage from "./components/CountryDetailPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DashboardPage from "./components/DashboardPage";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import FavoritesPage from "./components/FavoritesPage";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content */}
        <div className="flex-1 md:pl-64">
          <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <div className="pt-16 px-4">
            <Routes>
              <Route path="/list" element={<CountryListPage />} />
              <Route path="/" element={<DashboardPage />} />
              <Route path="/country/:countryCode" element={<CountryDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
