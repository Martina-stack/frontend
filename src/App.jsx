import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import GramSabhaDashboard from "./GramSabhaDashboard";
import CommunityDashboard from "./CommunityDashboard";
import SDLCDashboard from "./SDLCDashboard";
import DLCDashboard from "./DLCDashboard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
    // const token = localStorage.getItem("jwt_token");
    const token = localStorage.getItem("jwt_token");
    const role = localStorage.getItem("role");
    const navigate = useNavigate();
    const onLogout = () => {
        console.log("Hi");
        localStorage.clear();
        navigate("/login");
    };
    return (
        <div className="abc">
            <Routes>
                <Route
                    path="/login"
                    element={
                        token ? (
                            <Navigate to="/" />
                        ) : (
                            <LoginPage onLogout={onLogout} />
                        )
                    }
                />
                <Route
                    path="/signup"
                    element={token ? <Navigate to="/" /> : <SignupPage />}
                />
                <Route
                    path="/"
                    element={
                        token ? (
                            role === "USER" ? (
                                <Navigate to="/dashboard/gram-sabha" />
                            ) : role === "community" ? (
                                <Navigate to="/dashboard/community" />
                            ) : role === "ADMIN" ? (
                                <Navigate to="/dashboard/sdlc" />
                            ) : role === "dlc" ? (
                                <Navigate to="/dashboard/dlc" />
                            ) : (
                                <Navigate to="/login" />
                            )
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                <Route
                    path="/dashboard/gram-sabha"
                    element={<GramSabhaDashboard onLogout={onLogout} />}
                />
                <Route
                    path="/dashboard/community"
                    element={<CommunityDashboard onLogout={onLogout} />}
                />
                <Route
                    path="/dashboard/sdlc"
                    element={<SDLCDashboard onLogout={onLogout} />}
                />
                <Route
                    path="/dashboard/dlc"
                    element={<DLCDashboard onLogout={onLogout} />}
                />
            </Routes>
        </div>
    );
}

export default App;
