const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

const verify = require("./verify");
const submitHash = require("./blockchain");
const getSeverity = require("./severity");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 🔴 SINGLE SOURCE OF TRUTH
const DB_PATH = path.join(__dirname, "patterns.json");


/**
 * GET all malware patterns
 */
app.get("/patterns", (req, res) => {
  const data = fs.readFileSync(DB_PATH, "utf-8");
  res.json(JSON.parse(data));
});

/**
 * REPORT a new malware pattern (ADD ONLY – SAFE)
 */
app.post("/report", async (req, res) => {
  try {
    const { pattern } = req.body;

    // 1️⃣ Validate input
    if (!verify(pattern)) {
      return res.status(400).json({ error: "Invalid pattern" });
    }

    // 2️⃣ Calculate severity (server-side)
    const severity = getSeverity(pattern);

    // 3️⃣ Hash BOTH pattern + severity (protected fields)
    const payload = JSON.stringify({ pattern, severity });
    const hash =
      "0x" +
      crypto.createHash("sha256").update(payload).digest("hex");

    // 4️⃣ Submit hash to blockchain (audit layer)
    await submitHash(hash);

    // 5️⃣ Load DB (FILE SYSTEM, NOT require)
    const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

    // 6️⃣ Avoid duplicates (no overwrite)
    const exists = db.find(p => p.pattern === pattern);
    if (exists) {
      return res.status(409).json({
        message: "Pattern already exists",
        existing: exists
      });
    }

    // 7️⃣ Create new entry (ISO timestamp)
    const entry = {
      pattern,
      severity,
      hash,
      timestamp: new Date().toISOString()
    };

    // 8️⃣ Push entry to DB
    db.push(entry);

    // 9️⃣ Save DB to disk
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

    // 🔟 Respond to client
    res.json({
      status: "added",
      entry
    });

  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


/**
 * VERIFY DATABASE INTEGRITY
 * (Blockchain demo endpoint)
 */
app.get("/verify-db", (req, res) => {
  const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

  const results = db.map(e => {
    const recomputed =
      "0x" +
      crypto
        .createHash("sha256")
        .update(JSON.stringify({
          pattern: e.pattern,
          severity: e.severity
        }))
        .digest("hex");

    return {
      pattern: e.pattern,
      storedHash: e.hash,
      recomputedHash: recomputed,
      tampered: e.hash !== recomputed
    };
  });

  res.json(results);
});

/**
 * Start server
 */
app.listen(3000, () => {
  console.log("🚀 ChainGuard backend running on http://localhost:3000");
});
