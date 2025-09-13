import React, { useState } from "react";
import { Gauge, FileText, CheckSquare, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


// Claims data
const initialClaims = [
  { id: "C001", name: "Ravi shankarprasad Kumar", village: "Rampur", status: "Pending" },
  { id: "C002", name: "Sita Devi", village: "Lakhanpur", status: "Verified" },
  { id: "C003", name: "Amit Singh", village: "Basantpur", status: "Pending" },
];

export default function SDLCDashboard({ onLogout }) {
  const [claims, setClaims] = useState(initialClaims);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [verificationNote, setVerificationNote] = useState("");
  const [remandReason, setRemandReason] = useState("");
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  // Filter and search logic
  const filteredClaims = claims.filter(
    (c) =>
      (filter === "All" || c.status === filter) &&
      (c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase()))
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
        <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
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
          <span style={{ fontWeight: 800, fontSize: 14, letterSpacing: 1 }}>
            FRA Digitizer
          </span>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Link
            to="/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              color: "#222",
            }}
          >
            <Gauge size={20} /> Dashboard
          </Link>
          <Link
            to="/claims"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              color: "#222",
            }}
          >
            <FileText size={20} /> Claims
          </Link>
          <Link
            to="/verification"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              color: "#222",
            }}
          >
            <CheckSquare size={20} /> Verification
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: 32 }}>
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
            position: "relative",
          }}
        >
          <h1 style={{ fontSize: 28, fontWeight: 700 }}>SDLC Dashboard</h1>
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              position: "relative",
            }}
          >
            <User size={20} />
            <span>SDLC User</span>
            <ChevronDown size={16} />
            {isOpen && (
              <div
                style={{
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
                }}
              >
                <button style={dropdownBtn} onClick={() => alert("View profile")}>
                  Profile
                </button>
                <button style={dropdownBtn} onClick={() => alert("Change settings")}>
                  Settings
                </button>
                <button style={dropdownBtn} onClick={() => alert("Help / Support")}>
                  Help / Support
                </button>
                <hr
                  style={{
                    margin: "4px 0",
                    border: "none",
                    borderTop: "1px solid #eee",
                  }}
                />
                <button
                  style={{ ...dropdownBtn, color: "red" }}
                  onClick={onLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <hr
          style={{
            border: "none",
            borderTop: "2px solid #968f78",
            margin: "0 0 32px 0",
          }}
        />

        {/* Claims Overview and Filter/Search */}
        {!selectedClaim ? (
          <section
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 32,
              boxShadow: "0 2px 8px #0001",
            }}
          >
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
              Claims Overview
            </h2>
            <div style={{ marginBottom: 16, display: "flex", gap: 16 }}>
              <input
                type="text"
                placeholder="Search by name or claim ID"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  padding: 8,
                  borderRadius: 4,
                  border: "1px solid #ccc",
                  flex: 1,
                }}
              />
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                style={{ padding: 8, borderRadius: 4 }}
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Verified">Verified</option>
              </select>
            </div>

            {/* ----------- FIXED BLOCK TABLE (Only Change) ----------- */}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                tableLayout: "fixed", // important: fixed column widths
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>Claim ID</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Village</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredClaims.map((claim) => (
                  <tr key={claim.id}>
                    <td style={tdStyle}>{claim.id}</td>
                    <td style={tdStyle}>{claim.name}</td>
                    <td style={tdStyle}>{claim.village}</td>
                    <td style={tdStyle}>{claim.status}</td>
                    <td style={tdStyle}>
                      <button
                        style={{
                          background: "#166534",
                          color: "#fff",
                          border: "none",
                          borderRadius: 4,
                          padding: "6px 12px",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedClaim(claim)}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* ----------- END OF CHANGE ----------- */}
          </section>
        ) : (
          // Claim Review Page (unchanged)
    <section
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: "32px 40px",
        boxShadow: "0 2px 8px #0001",
        maxWidth: 800,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 24
      }}
    >
       <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 16, // space between back button and oval
      marginBottom: 10
    }}
    >

    </div>
       {/* Left: Back to Claims */}
         <button
              onClick={() => setSelectedClaim(null)}
              style={{
                marginBottom: 10,
                background: "none",
                border: "none",
                color: "#166534",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              ← Back to Claims
            </button>

      {/* ---- Title in Oval ---- */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 10
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: "#f4f4f4",
            padding: "10px 28px",
            borderRadius: 999,
            fontSize: 22,
            fontWeight: 700,
            color: "#333",
            boxShadow: "0 1px 4px #0002"
          }}
        >
          Claim Review: {selectedClaim.id}
        </span>
      </div>

      {/* ---- Top action row ---- */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10
        }}
      >
       
      </div>

      {/* ---- Details Grid ---- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          fontSize: 16
        }}
      >
        <div>
          <strong>Claimant Name:</strong> {selectedClaim.name}
        </div>
        <div>
          <strong>Village:</strong> {selectedClaim.village}
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <strong>Document:</strong>{" "}
          <Link
            style={{ color: "#007bff", textDecoration: "underline" }}
            to="#"
          >
            View PDF/Image
          </Link>
        </div>
      </div>

      {/* ---- Verification Notes ---- */}
      <div>
        <strong>Verification Notes:</strong>
        <textarea
          value={verificationNote}
          onChange={(e) => setVerificationNote(e.target.value)}
          style={{
            width: "100%",
            minHeight: 100, // longer box by bottom
            borderRadius: 6,
            border: "1px solid #ccc",
            marginTop: 6,
            padding: 10,
            fontSize: 15,
            resize: "vertical"
          }}
        />
      </div>

        {/* Right: Buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          <button
            style={{
              background: "#8B4513", // dark brown
              color: "#fff",
              padding: "8px 16px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontWeight: 600
            }}
  onClick={() => {
    // Navigate to DLC page
    navigate("./DLCDashboard");
  }}
>
  Forward to DLC
</button>
          <button
            style={{
              background: "#5C4033", // deeper brown
              color: "#fff",
              padding: "8px 16px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontWeight: 600
            }}
            onClick={() => {
              const reason = prompt("Please provide a reason for remand:");
              if (reason) setRemandReason(reason);
            }}
          >
            Remand to Gram Sabha
          </button>
        </div>

      {remandReason && (
        <div style={{ color: "#b91c1c", marginTop: 8 }}>
          <strong>Remand Reason:</strong> {remandReason}
        </div>
      )}
    </section>
  )
}


      </main>
    </div>
  );
}

// --- reusable styles for the fixed table ---
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
