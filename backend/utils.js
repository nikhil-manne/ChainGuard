function getBaseDomain(url) {
  try {
    const u = new URL(url.startsWith("http") ? url : "https://" + url);
    const parts = u.hostname.split(".");
    return parts.slice(-2).join(".");
  } catch {
    return null;
  }
}

module.exports = { getBaseDomain };
