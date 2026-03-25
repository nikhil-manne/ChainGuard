const { getBaseDomain } = require("./utils");

function isLikelyTrusted(url) {
  const domain = getBaseDomain(url);
  if (!domain) return false;

  // Known TLDs (public suffix idea)
  const trustedTLDs = ["com", "org", "edu", "gov", "net"];

  const tld = domain.split(".").pop();
  if (!trustedTLDs.includes(tld)) return false;

  // HTTPS check
  if (!url.startsWith("https://")) return false;

  return true;
}

module.exports = isLikelyTrusted;
