const API = "http://localhost:3000/patterns";

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (!tab.url || !changeInfo.status === "complete") return;

  try {
    const res = await fetch(API);
    const patterns = await res.json();

    const blocked = patterns.find(p =>
      tab.url.includes(p.pattern) && p.severity === "high"
    );

    if (blocked) {
      chrome.tabs.update(tabId, {
        url: chrome.runtime.getURL("warning.html")
      });
    }
  } catch (err) {
    console.error("ChainGuard error:", err);
  }
});
