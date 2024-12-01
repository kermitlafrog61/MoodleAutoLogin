chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {
        if (tab.url.includes("el2019.kimep.kz")) {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['contentScript.js']
            });
        }
    }
});
