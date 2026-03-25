# 🔐 ChainGuard – Blockchain-Based Integrity & Malware Pattern Verification System

ChainGuard is a security-focused system designed to ensure **tamper-proof storage, verification, and distribution of malware detection patterns** using a hybrid **off-chain + on-chain architecture**.

The system combines **cryptographic hashing**, **backend validation**, **blockchain anchoring**, and a **browser extension** to create a trustworthy and verifiable security pipeline.

---

## 🧠 System Overview

ChainGuard ensures that malware detection patterns cannot be altered without detection.

* 📦 Patterns are stored locally (fast access)
* 🔐 Each pattern is hashed using SHA-256
* ⛓️ Hashes are anchored on blockchain for immutability
* 🌐 Browser extension consumes verified patterns for real-time protection

---

## 🏗️ Architecture

```id="j8dj7l"
Pattern Input
   ↓
Backend Processing (Validation + Hashing)
   ↓
Local Storage (patterns.json)
   ↓
Blockchain Anchoring (Hash stored on-chain)
   ↓
Verification Layer (Recompute + Compare)
   ↓
Browser Extension (Real-time usage)
```

---

## 📁 Project Structure

```id="7a7q9m"
ChainGuard/
├── backend/            # Core API + integrity validation
├── blockchain/         # Smart contract + deployment scripts
├── chrome-extension/   # Browser extension for real-time protection
├── admin.html          # Lightweight admin interface
```

---

## ⚙️ Backend (Integrity Engine)

Located in: `backend/`

### Features:

* 🔐 **SHA-256 Hashing** for pattern integrity
* 🧠 **Server-side validation & severity scoring**
* 🚫 **Duplicate prevention**
* 📂 **Append-only storage model**
* 🔍 **Tamper detection** (recompute & compare hashes)

### Key Files:

* `server.js` → API server
* `verify.js` → validation logic
* `trustCheck.js` → integrity verification
* `trustScore.js` → scoring mechanism
* `patterns.json` → stored patterns

---

## ⛓️ Blockchain Layer (Audit System)

Located in: `blockchain/`

### Features:

* 📜 Smart contract for storing pattern hashes
* 🔗 Immutable audit trail
* ⚡ Lightweight integration (only hashes stored on-chain)

### Key Files:

* `PatternRegistry.sol` → smart contract
* `deploy.js` → deployment script
* `hardhat.config.js` → blockchain config

---

## 🌐 Chrome Extension (Client Layer)

Located in: `chrome-extension/`

### Features:

* 🛡️ Real-time pattern usage in browser
* ⚠️ Warning system for suspicious activity
* 🔄 Fetches verified patterns from backend
* 📊 Popup interface for user interaction

### Key Files:

* `background.js` → background processing
* `popup.js` → UI logic
* `manifest.json` → extension config
* `warning.html` → alert UI

---

## 🖥️ Admin Panel

* Lightweight HTML interface (`admin.html`)
* Used to manage and monitor pattern entries
* Interacts directly with backend APIs

---

## 🔐 Design Principles

* 🔒 **Integrity First** → Hash-based validation prevents tampering
* ⛓️ **Blockchain for Trust** → Immutable verification layer
* ⚡ **Efficiency** → Only hashes stored on-chain (not full data)
* 🧠 **Backend Authority** → Validation and scoring handled server-side
* 🌐 **Client Integration** → Browser extension enables real-time usage

---

## 🚀 Getting Started

### 1. Clone the repository

```bash id="b0k5il"
git clone https://github.com/your-username/ChainGuard.git
cd ChainGuard
```

---

### 2. Setup Backend

```bash id="d3ks2q"
cd backend
npm install
npm start
```

---

### 3. Setup Blockchain (Optional)

```bash id="1gk9cv"
cd blockchain
npm install
npx hardhat compile
npx hardhat run deploy.js
```

---

### 4. Load Chrome Extension

1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable **Developer Mode**
4. Click **Load Unpacked**
5. Select `chrome-extension/` folder

---

## 📦 Tech Stack

* **Backend:** Node.js, Express
* **Security:** SHA-256 Hashing
* **Blockchain:** Solidity, Hardhat
* **Frontend:** HTML, JavaScript
* **Extension:** Chrome Extension APIs

---

## 📊 Key Highlights

* Hybrid **off-chain + on-chain architecture**
* **Cryptographic integrity verification system**
* **Tamper detection pipeline**
* **Browser extension for real-time security**
* **Lightweight blockchain usage for auditability**

---

## 📌 Future Improvements

* Merkle tree-based verification
* Decentralized storage (IPFS)
* Advanced anomaly detection
* Multi-chain support

---

## 👤 Author

**Nikhil Pintu**
Backend & Systems Engineer

---
