export const STATUS_ACTIVE = {
  ON: "ON",
  OFF: "OFF",
};

export const BTN_ACTIVE = {
  ACTIVE: "button is-small is-primary",
  INACTIVE: "button is-small is-danger",
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });

    if (tab?.url) {
      const url = new URL(tab.url);
      const hostname = url.hostname;

      const currentUrlElement = document.getElementById("current-url");
      if (currentUrlElement) {
        currentUrlElement.innerHTML = hostname;
      } else {
        console.error('Element with ID "current-url" not found');
      }
    } else {
      console.error("Tab or tab.url is undefined");
    }
  } catch (error) {}
});

document.addEventListener("DOMContentLoaded", () => {
  const getCopyrightText = () => {
    const year = new Date().getFullYear();
    return `© ${year} Eclipse-Walker`;
  };

  const copyrightText = getCopyrightText();
  const dateCopyrightElement = document.getElementById("date-right");

  if (dateCopyrightElement) {
    dateCopyrightElement.innerHTML = copyrightText;
  } else {
    console.error('Element with ID "date-right" not found');
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const activeBtn = document.getElementById("active-btn");
  const cleanLinkLabel = document.getElementById("title-app");

  async function updateStatus() {
    try {
      const result = await chrome.storage.local.get(["status_active"]);
      const status =
        result.status_active !== undefined ? result.status_active : false;
      activeBtn.className = status ? BTN_ACTIVE.ACTIVE : BTN_ACTIVE.INACTIVE;
      activeBtn.textContent = status ? STATUS_ACTIVE.ON : STATUS_ACTIVE.OFF;

      cleanLinkLabel.className = status
        ? "title has-text-primary"
        : "title has-text-grey-light";
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }

  await updateStatus();

  activeBtn.addEventListener("click", async () => {
    try {
      const result = await chrome.storage.local.get(["status_active"]);
      const currentStatus =
        result.status_active !== undefined ? result.status_active : false;
      const newStatus = !currentStatus;

      await chrome.storage.local.set({ status_active: newStatus });
      await updateStatus();
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  });
});
