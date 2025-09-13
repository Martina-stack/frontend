import { useState } from "react";
import { Gauge, FileText, CheckSquare, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Tesseract from "tesseract.js"; // For OCR
import nlp from "compromise"; // For NER

export default function CommunityDashboard({ onLogout }) {
  // State to toggle dropdown visibility
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null); // Store uploaded file
  const [extractedText, setExtractedText] = useState(""); // Store OCR-extracted text
  const [entities, setEntities] = useState([]); // Store NER results
  const [isProcessing, setIsProcessing] = useState(false); // Track processing state

  
  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && (selectedFile.type.includes("image") || selectedFile.type === "application/pdf")) {
      setFile(selectedFile);
    } else {
      alert("Please upload an image or PDF file.");
      setFile(null);
    }
  };

  // Process file with OCR and NER
    const processFile = async () => {
      if (!file) {
        alert("Please select a file to process.");
        return;
      }
  
      setIsProcessing(true);
      try {
        const { data: { text } } = await Tesseract.recognize(file, "eng", {
          logger: (m) => console.log(m),
        });
        setExtractedText(text);
      
         const doc = nlp(text);
              const extractedEntities = [
                ...doc.people().out("array").map((entity) => ({ type: "Person", value: entity })),
                ...doc.places().out("array").map((entity) => ({ type: "Place", value: entity })),
                ...doc.dates().out("array").map((entity) => ({ type: "Date", value: entity })),
              ];
              setEntities(extractedEntities);
            } catch (error) {
              console.error("Error processing file:", error);
              alert("An error occurred while processing the file.");
            } finally {
              setIsProcessing(false);
            }
          };

          
  // Handle form submission
  const handleSubmit = () => {
    if (!extractedText || entities.length === 0) {
      alert("No data to submit. Please process a file first.");
      return;
    }
    console.log("Submitting:", { extractedText, entities });
    alert("Claim data submitted successfully!");
    setFile(null);
    setExtractedText("");
    setEntities([]);
  };

  return (
    <div className="community-dashboard-bg" style={{ display: "flex" }}>
      {/* ---------- LEFT SIDEBAR ---------- */}
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
          {/* Logo + title at top of sidebar */}
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

        {/* Sidebar navigation links with icons */}
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
      {/* ---------- END SIDEBAR ---------- */}

      {/* ---------- MAIN CONTENT AREA ---------- */}
      <main style={{ flex: 1, padding: 32 }}>
        {/* Top bar: page title on the left, profile dropdown on the right */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
            position: "relative", // for absolute positioning of dropdown
          }}
        >
          <h1 style={{ fontSize: 28, fontWeight: 700 }}>Community Users</h1>

          {/* ---------- Profile Block with Dropdown ---------- */}
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
            <span>Community User</span>
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
                {/* Dropdown options */}
                <button
                  style={menuItemStyle}
                  onClick={() => alert("View or edit Community profile")}
                >
                  Profile
                </button>
                <button
                  style={menuItemStyle}
                  onClick={() => alert("Change password or preferences")}
                >
                  Settings
                </button>
                <button
                  style={menuItemStyle}
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
                  style={{ ...menuItemStyle, color: "red" }}
                  onClick={onLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --- Horizontal margin (divider) --- */}
  <hr style={{ border: "none", borderTop: "2px solid #968f78", margin: "0 0 32px 0" }} />


        {/* Card for submitting a new claim */}
        <section
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 32,
            boxShadow: "0 2px 8px #0001",
          }}
        >
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
            Submit Community Claim
          </h2>
          <p style={{ color: "#666", marginBottom: 24 }}>
            Upload your community claim document for review.
          </p>
          <div
            style={{
              border: "2px dashed #ddd",
              borderRadius: 8,
              padding: 32,
              textAlign: "center",
              marginBottom: 24,
            }}
            onDragOver={(e) => e.preventDefault()} // Allow drop
  onDragEnter={(e) => {
    e.preventDefault();
    // Optional: Add visual feedback (e.g., change border color)
  }}
  onDragLeave={(e) => {
    e.preventDefault();
    // Optional: Revert visual feedback
  }}
  onDrop={(e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type.includes("image") || droppedFile.type === "application/pdf")) {
      setFile(droppedFile);
    } else {
      alert("Please drop an image or PDF file.");
      setFile(null);
    }
  }}
          >
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              style={{
                display: "block",
                cursor: "pointer",
                marginBottom: 16,
                color: "#333",
              }}
            >
              
               Upload a file or drag and drop here{file ?file.name : ""}
              <h1 style={{ fontSize: 12, fontWeight: 400, margin: 0, color: '#222' }}> (PNG,JPG or PDF upto 10MB) </h1>
            </label>
            <button
              onClick={processFile}
              disabled={isProcessing || !file}
              style={{
                padding: "8px 16px",
                background: isProcessing || !file ? "#ccc" : "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                cursor: isProcessing || !file ? "not-allowed" : "pointer",
              }}
            >
              {isProcessing ? "Processing..." : "Process Document"}
            </button>
          </div>

          {extractedText && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600 }}>Extracted Text</h3>
              <pre style={{ background: "#f5f5f5", padding: 16, borderRadius: 8, maxHeight: 200, overflowY: "auto" }}>
                {extractedText}
              </pre>
            </div>
          )}

          
          {entities.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600 }}>Extracted Entities</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {entities.map((entity, index) => (
                  <li key={index} style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                    <strong>{entity.type}:</strong> {entity.value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          
          {(extractedText || entities.length > 0) && (
            <button
              onClick={handleSubmit}
              style={{
                padding: "8px 16px",
                background: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Submit Claim
              </button>
          )}
        </section>
      </main>
    </div>
  );
}

// shared dropdown button styles
const menuItemStyle = {
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
