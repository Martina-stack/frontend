import React, { useState } from "react";
import { Gauge, FileText, CheckSquare, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const initialClaims = [
  { id: "C001", name: "Ravi Kumar", village: "Rampur", status: "Pending" },
  { id: "C002", name: "Sita Devi", village: "Lakhanpur", status: "Verified" },
  { id: "C003", name: "Amit Singh", village: "Basantpur", status: "Pending" },
];

export default function DLCDashboard({ onLogout }) {
  const [claims, setClaims] = useState(initialClaims);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [actionReason, setActionReason] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Filter and search logic
  const filteredClaims = claims.filter(
    (c) =>
      (filter === "All" || c.status === filter) &&
      (c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase()))
  );

   {/* Sidebar: Navigation menu for DLC users */}
  return (
    <div className="dlc-dashboard-bg" style={{ display: "flex" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          background: "#fff",
          padding: 24,
          boxShadow: "2px 0 8px #0001",
        }}
      >
        {/* Logo and title section */}
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

        
        {/* Navigation links to different sections of the DLC dashboard */}
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
          <h1 style={{ fontSize: 28, fontWeight: 700 }}>DLC Dashboard</h1>
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
            <span>DLC User</span>
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
    
                {/* Dropdown menu options for user actions */}
    <button
      style={{
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
      }}
      onClick={() => alert("View or edit profile")}
    >
      Profile
    </button>
    <button
      style={{
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
      }}
      onClick={() => alert("Change settings")}
    >
      Settings
    </button>
    <button
      style={{
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
      }}
      onClick={() => alert("Contact help/support")}
    >
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
      style={{
        display: "block",
        width: "100%",
        padding: "8px 12px",
        background: "transparent",
        border: "none",
        textAlign: "left",
        cursor: "pointer",
        fontSize: 14,
        fontWeight: 500,
        color: "red",
        transition: "background 0.2s",
      }}
      onClick={onLogout}
    >
      Logout
    </button>
  </div>
)}
          </div>
        </div>

        {/* Divider */}
        <hr style={{ border: "none", borderTop: "2px solid #968f78", margin: "0 0 32px 0" }} />

        {/* Claims List and Filter/Search */}
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
              Claims List
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
                <option value="Approved">Approved</option>
              </select>
            </div>
<table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed", // ensures fixed column widths
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
            Finalize
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

          </section>
        ) : (
          // Claim Finalization Page
          <section
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 32,
              boxShadow: "0 2px 8px #0001",
            }}
          >
            <button
              onClick={() => setSelectedClaim(null)}
              style={{
                marginBottom: 16,
                background: "none",
                border: "none",
                color: "#166534",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              ← Back to Claims
            </button>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
              Claim Finalization: {selectedClaim.id}
            </h2>

{/* ---- Claim Details Grid ---- */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
    fontSize: 16,
    marginBottom: 12
  }}
>
  <div>
    <strong>Claim ID:</strong> {selectedClaim.id}
  </div>
  <div>
    <strong>Status:</strong> {selectedClaim.status}
  </div>
  <div>
    <strong>Claimant Name:</strong> {selectedClaim.name}
  </div>
  <div>
    <strong>Village:</strong> {selectedClaim.village}
  </div>
  <div style={{ gridColumn: "1 / -1" }}>
    <strong>Document:</strong>{" "}
    <a href="#" style={{ color: "#007bff", textDecoration: "underline" }}>
      View PDF/Image
    </a>
  </div>
</div>


            <div style={{ marginBottom: 12 }}>
              <strong>Notes from Gram Sabha & SDLC:</strong>
              <ul>
                <li>Gram Sabha: ...</li>
                <li>SDLC: ...</li>
              </ul>
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <button
                style={{
                  background: "#166534",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: 4,
                  border: "none",
                }}
                onClick={() => setShowReport(true)}
              >
                Approve & Generate Report
              </button>
              <button
                style={{
                  background: "#eab308",
                  color: "#222",
                  padding: "8px 16px",
                  borderRadius: 4,
                  border: "none",
                }}
                onClick={() => {
                  const reason = prompt("Please provide a reason for remand:");
                  if (reason) setActionReason(reason);
                }}
              >
                Remand to SDLC
              </button>
              <button
                style={{
                  background: "#b91c1c",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: 4,
                  border: "none",
                }}
                onClick={() => {
                  const reason = prompt("Please provide a reason for rejection:");
                  if (reason) setActionReason(reason);
                }}
              >
                Reject
              </button>
            </div>
            {actionReason && (
              <div style={{ marginTop: 12, color: "#b91c1c" }}>
                <strong>Reason:</strong> {actionReason}
              </div>
            )}
            {showReport && (
              <div style={{ marginTop: 24, background: "#f5f5f5", padding: 16, borderRadius: 8 }}>
                <h3>Record of Rights (PDF Preview)</h3>
                <p>Claimant: {selectedClaim.name}</p>
                <p>Village: {selectedClaim.village}</p>
                {/* Add more details as needed */}
                <button style={{ marginTop: 8 }}>Download PDF</button>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
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
