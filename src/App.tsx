import React, { useEffect, useState } from "react";

export const STATUS_ACTIVE = {
  ON: "ON",
  OFF: "OFF",
};

export const BTN_ACTIVE = {
  ACTIVE: "button is-small is-primary",
  INACTIVE: "button is-small is-danger",
};
/* 
const allowedDomains = [
  "shopee.co.th",
  "shopee.com",
  "lazada.co.th",
  "lazada.com",
];
 */
const App: React.FC = () => {
  const [hostname, setHostname] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const getHostname = async () => {
      try {
        const [tab] = await chrome.tabs.query({
          active: true,
          lastFocusedWindow: true,
        });
        if (tab?.url) {
          const url = new URL(tab.url);
          setHostname(url.hostname);
        } else {
          console.error("Tab or tab.url is undefined");
        }
      } catch (error) {
        console.error("Error getting hostname:", error);
      }
    };

    const getCopyrightText = () => {
      const year = new Date().getFullYear();
      return `© ${year} Eclipse-Walker`;
    };

    const updateStatus = async () => {
      try {
        const result = await chrome.storage.local.get("status_active");
        setStatus(
          result.status_active !== undefined ? result.status_active : false
        );
      } catch (error) {
        console.error("Error updating status:", error);
      }
    };

    getHostname();
    updateStatus();

    const dateCopyrightElement = document.getElementById("date-right");
    if (dateCopyrightElement) {
      dateCopyrightElement.innerHTML = getCopyrightText();
    } else {
      console.error('Element with ID "date-right" not found');
    }
  }, []);

  const toggleStatus = async () => {
    try {
      const result = await chrome.storage.local.get("status_active");
      const newStatus = !result.status_active;
      await chrome.storage.local.set({ status_active: newStatus });
      setStatus(newStatus);
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  return (
    <div>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <p
          id="title-app"
          className={`title ${
            status ? "has-text-primary" : "has-text-grey-light"
          }`}
          style={{
            textAlign: "end",
            justifyContent: "flex-end",
            display: "flex",
            alignItems: "center",
            margin: "5px",
          }}
        >
          Clean Link!
        </p>
        <div
          className="has-text-white"
          style={{
            textAlign: "end",
            justifyContent: "flex-end",
            display: "flex",
            alignItems: "center",
          }}
        >
          Status:{" "}
          <button
            style={{ margin: "5px" }}
            id="active-btn"
            className={status ? BTN_ACTIVE.ACTIVE : BTN_ACTIVE.INACTIVE}
            onClick={toggleStatus}
          >
            {status ? STATUS_ACTIVE.ON : STATUS_ACTIVE.OFF}
          </button>
        </div>
      </div>
      <div
        className="row"
        style={{ marginLeft: "5px", display: "flex", flexDirection: "row" }}
      >
        <p>Add</p>
        <div id="current-url" style={{ marginLeft: "5px" }}>
          {hostname}
        </div>
        <p>to Blacklist</p>
      </div>
      <section className="">
        <div className="hero-body" style={{ marginLeft: "5px" }}>
          <p className="is-size-7">
            A Chrome Extension to Remove Affiliates & Remove query strings from
            URLs for e-Commerce platform.
          </p>
        </div>
      </section>
      <footer>
        <p className="is-size-7 has-background-grey-dark" id="date-right"></p>
      </footer>
    </div>
  );
};

export default App;
