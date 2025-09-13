import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import GramSabhaDashboard from "./GramSabhaDashboard";
import CommunityDashboard from "./CommunityDashboard";
import SDLCDashboard from "./SDLCDashboard";
import DLCDashboard from "./DLCDashboard";

function App() {
  const token = localStorage.getItem("jwt_token");

  return (
    <div className="abc">

      <Routes>
        <Route 
          path="/login" 
          element={ token ? <Navigate to="/" /> : <LoginPage /> } 
        />
        <Route 
          path="/" 
          element={ token ? <Navigate to="/dashboard" /> : <Navigate to="/login" /> } 
        />
        <Route path="/dashboard/gram-sabha" element={<GramSabhaDashboard />} />
        <Route path="/dashboard/community" element={<CommunityDashboard />} />
        <Route path="/dashboard/sdlc" element={<SDLCDashboard />} />
        <Route path="/dashboard/dlc" element={<DLCDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
