let activeTabId = null;
let activeTabUrl = null;

browser.tabs.onActivated.addListener(onActiveListerner);
browser.tabs.onUpdated.addListener(onUpdateListener, { properties: ["url"], tabId: activeTabId });
browser.windows.onFocusChanged.addListener(onFocusChange);

function onActiveListerner(activeInfo) {
  activeTabId = activeInfo.tabId;
  browser.tabs.get(activeTabId).then((tab) => {
    activeTabUrl = tab.url;
    console.log("Active tab changed - URL:", activeTabUrl);
  }).catch((error) => {
    console.error("Error getting tab info:", error);
  });
};

function onUpdateListener(tabId, changeInfo, tab) {
  activeTabUrl = changeInfo.url;
  console.log("URL updated - New URL:", activeTabUrl);
};

function onFocusChange(windowId) {

  if (windowId === browser.windows.WINDOW_ID_NONE) {
    // No window is focused
    return;
  }
  browser.tabs.query({ active: true, windowId: windowId }).then((tabs) => {
    if (tabs[0]) {
      activeTabId = tabs[0].id;
      activeTabUrl = tabs[0].url;
      console.log("Window focus changed - Active URL:", activeTabUrl);
    }
  });
};

//Initial load
browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
  if (tabs[0]) {
    activeTabId = tabs[0].id;
    activeTabUrl = tabs[0].url;
    console.log("[SlapHead] loaded - Initial URL:", activeTabUrl);
  }
});
