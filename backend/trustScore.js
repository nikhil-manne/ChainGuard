const { getBaseDomain } = require("./utils");

function getTrustScore(url) {
  let score = 0;
  const lower = url.toLowerCase();

  // HTTPS check
  if (url.startsWith("https://")) score += 2;

  // Domain extraction
  const domain = getBaseDomain(url);
  if (!domain) return -10;

  // Shorter domains are generally safer
  if (domain.length < 20) score += 1;

  // Phishing keywords reduce trust
  const badWords = ["login", "verify", "secure", "update", "account"];
  badWords.forEach(word => {
    if (lower.includes(word)) score -= 2;
  });

  // Subdomain abuse (too many dots)
  const dotCount = url.split(".").length - 1;
  if (dotCount > 4) score -= 2;

  return score;
}

module.exports = getTrustScore;
