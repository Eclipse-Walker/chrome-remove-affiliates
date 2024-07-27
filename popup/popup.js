const STATUS_ACTIVE = {
  ON: "ON",
  OFF: "OFF",
};

const BTN_ACTIVE = {
  ACTIVE: "button is-small is-primary",
  INACTIVE: "button is-small is-danger",
};

document.addEventListener("DOMContentLoaded", () => {
  const dateCopyRight = "© "
    .concat(new Date().getFullYear())
    .concat(" Eclipse-Walker");
  const dateCopyRightElement = document.getElementById("date-right");
  dateCopyRightElement.innerHTML = dateCopyRight;
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
