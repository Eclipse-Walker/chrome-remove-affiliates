const allowedDomains = [
  "shopee.co.th",
  "shopee.com",
  "lazada.co.th",
  "lazada.com",
];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ status_active: true });
});

chrome.webNavigation.onCommitted.addListener(
  async (details) => {
    try {
      const url = new URL(details.url);
      const hostname = url.hostname;
      const { status_active } = await chrome.storage.local.get([
        "status_active",
      ]);

      if (allowedDomains.some((domain) => hostname.endsWith(domain))) {
        if (status_active === true && url.search) {
          url.search = "";
          chrome.tabs.update(details.tabId, { url: url.href });
        }
      }
    } catch (error) {
      console.error("Error handling webNavigation.onCommitted:", error);
    }
  },
  { url: [{ urlMatches: "http" }] }
);
