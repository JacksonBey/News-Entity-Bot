chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getPageContent") {
    // sendResponse(document.body.innerHTML);
    sendResponse(document.body.innerText)
  }
})
