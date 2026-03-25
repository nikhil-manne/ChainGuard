module.exports = function verify(pattern) {
  if (!pattern) return false;
  if (pattern.length < 5) return false;
  if (pattern.includes(" ")) return false;
  return true;
};
