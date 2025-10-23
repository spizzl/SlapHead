// content-script.js

let tabId = 2;

// Tab-ID beim Start abrufen
//browser.tabs.getCurrent().then(tab => {
//  tabId = tab.id;
//}).catch(err => {
//  console.error("Kann Tab-ID nicht abrufen:", err);
//});

// Nachricht senden beim Schließen
window.addEventListener("beforeunload", function () {
  browser.runtime.sendMessage({
    action: "tab_closed",
    tabId: tabId
  }).catch(err => {
    console.warn("Nachricht konnte nicht gesendet werden:", err);
  });
});
function onGot(tabInfo) {
  console.log(tabInfo);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

const gettingCurrent = browser.tabs.getCurrent();
gettingCurrent.then(onGot, onError);
