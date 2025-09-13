import React, { useEffect, useState } from "react";
import { Gauge, FileText, CheckSquare, User, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getAllClaims } from "./api";

export default function SDLCDashboard({ onLogout }) {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [selectedClaim, setSelectedClaim] = useState(null);
    const [verificationNote, setVerificationNote] = useState("");
    const [remandReason, setRemandReason] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await getAllClaims();
                setData(res.data);
                console.log(res.data);
            } catch (err) {
                console.error("Error fetching claims:", err);
            }
        };
        fetchData();
    }, []);

    // Filter + search
    const filteredClaims = data.filter(
        (c) =>
            (filter === "All" || c.status === filter) &&
            (c.claimantName.toLowerCase().includes(search.toLowerCase()) ||
                c.id.toString().toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="gram-sabha-dashboard-bg" style={{ display: "flex" }}>
            {/* Sidebar */}
            <aside
                style={{
                    width: 240,
                    background: "#fff",
                    padding: 24,
                    boxShadow: "2px 0 8px #0001",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 32,
                    }}
                >
                    <img
                        src="/logo.jpg"
                        alt="FRA Logo"
                        style={{
                            width: 50,
                            height: 50,
                            marginRight: 12,
                            objectFit: "contain",
                        }}
                    />
                    <span
                        style={{
                            fontWeight: 800,
                            fontSize: 14,
                            letterSpacing: 1,
                        }}
                    >
                        FRA Digitizer
                    </span>
                </div>
                <nav
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                    }}
                >
                    <Link to="/dashboard" style={navLinkStyle}>
                        <Gauge size={20} /> Dashboard
                    </Link>
                    <Link to="/claims" style={navLinkStyle}>
                        <FileText size={20} /> Claims
                    </Link>
                    <Link to="/verification" style={navLinkStyle}>
                        <CheckSquare size={20} /> Verification
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: 32 }}>
                {/* Top bar */}
                <div style={topBarStyle}>
                    <h1 style={{ fontSize: 28, fontWeight: 700 }}>
                        SDLC Dashboard
                    </h1>
                    <div
                        onClick={() => setIsOpen((prev) => !prev)}
                        style={profileStyle}
                    >
                        <User size={20} />
                        <span>SDLC User</span>
                        <ChevronDown size={16} />
                        {isOpen && (
                            <div style={dropdownMenuStyle}>
                                <button
                                    style={dropdownBtn}
                                    onClick={() => alert("View profile")}
                                >
                                    Profile
                                </button>
                                <button
                                    style={dropdownBtn}
                                    onClick={() => alert("Change settings")}
                                >
                                    Settings
                                </button>
                                <button
                                    style={dropdownBtn}
                                    onClick={() => alert("Help / Support")}
                                >
                                    Help / Support
                                </button>
                                <hr style={dropdownDivider} />
                                <button
                                    style={{ ...dropdownBtn, color: "red" }}
                                    onClick={() => onLogout()}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <hr style={dividerStyle} />

                {/* Claims Overview and Filter/Search */}
                {!selectedClaim ? (
                    <section style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>Claims Overview</h2>
                        <div style={filterRowStyle}>
                            <input
                                type="text"
                                placeholder="Search by name or claim ID"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={searchInputStyle}
                            />
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                style={{ padding: 8, borderRadius: 4 }}
                            >
                                <option value="All">All</option>
                                <option value="PENDING">Pending</option>
                                <option value="APPROVED">Approved</option>
                                <option value="REJECTED">Rejected</option>
                            </select>
                        </div>

                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={thStyle}>Claim ID</th>
                                    <th style={thStyle}>Name</th>
                                    <th style={thStyle}>Type</th>
                                    <th style={thStyle}>Date</th>
                                    <th style={thStyle}>Status</th>
                                    <th style={thStyle}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredClaims.map((claim) => (
                                    <tr key={claim.id}>
                                        <td style={tdStyle}>{claim.id}</td>
                                        <td style={tdStyle}>
                                            {claim.claimantName}
                                        </td>
                                        <td style={tdStyle}>
                                            {claim.claimType}
                                        </td>
                                        <td style={tdStyle}>
                                            {claim.dateFiled}
                                        </td>
                                        <td style={tdStyle}>{claim.status}</td>
                                        <td style={tdStyle}>
                                            <button
                                                style={reviewBtnStyle}
                                                onClick={() =>
                                                    setSelectedClaim(claim)
                                                }
                                            >
                                                Review
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                ) : (
                    // Review section stays same as yours
                    <section> ... your claim review UI ... </section>
                )}
            </main>
        </div>
    );
}

// --- reusable styles ---
const navLinkStyle = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    color: "#222",
};
const topBarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    position: "relative",
};
const profileStyle = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    position: "relative",
};
const dropdownMenuStyle = {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: 8,
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    minWidth: 180,
    zIndex: 10,
};
const dropdownBtn = {
    display: "block",
    width: "100%",
    padding: "8px 12px",
    background: "transparent",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    color: "#333",
    transition: "background 0.2s",
};
const dropdownDivider = {
    margin: "4px 0",
    border: "none",
    borderTop: "1px solid #eee",
};
const dividerStyle = {
    border: "none",
    borderTop: "2px solid #968f78",
    margin: "0 0 32px 0",
};
const sectionStyle = {
    background: "#fff",
    borderRadius: 12,
    padding: 32,
    boxShadow: "0 2px 8px #0001",
};
const sectionTitleStyle = {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 16,
};
const filterRowStyle = {
    marginBottom: 16,
    display: "flex",
    gap: 16,
};
const searchInputStyle = {
    padding: 8,
    borderRadius: 4,
    border: "1px solid #ccc",
    flex: 1,
};
const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed",
};
const thStyle = {
    border: "2px solid #000",
    padding: "8px",
    width: "150px",
    textAlign: "center",
    background: "#f5f5f5",
};
const tdStyle = {
    border: "2px solid #000",
    padding: "8px",
    width: "150px",
    textAlign: "center",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
};
const reviewBtnStyle = {
    background: "#166534",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    padding: "6px 12px",
    cursor: "pointer",
};
