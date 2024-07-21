const allowedDomains = [
  "shopee.co.th",
  "shopee.com",
  "lazada.co.th",
  "lazada.com",
];

(async () => {
  chrome.webNavigation.onCompleted.addListener(
    (details) => {
      const url = new URL(details.url);
      const hostname = url.hostname;

      if (allowedDomains.some((domain) => hostname.endsWith(domain))) {
        if (url.search) {
          url.search = "";
          chrome.tabs.update(details.tabId, { url: url.href });
        }
      }
    },
    { url: [{ urlMatches: "http" }] }
  );
})();
