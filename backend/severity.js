const getTrustScore = require("./trustScore");

/**
 * Decide severity based on multi-signal trust score
 *
 * Severity policy:
 *   score >= 2  → low
 *   score >= 0  → medium
 *   score <  0  → high
 */
function getSeverity(pattern) {
  const score = getTrustScore(pattern);

  // ✅ Trusted / legitimate
  if (score >= 2) {
    return "low";
  }

  // ⚠ Suspicious but not confirmed malicious
  if (score >= 0) {
    return "medium";
  }

  // 🚨 High risk / phishing / malware
  return "high";
}

module.exports = getSeverity;
