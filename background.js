chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received from chrome", request)

//   chrome.storage.local.set({ key: value }).then(() => {
//   console.log("Value is set");
// });

// chrome.storage.local.get(["key"]).then((result) => {
//   console.log("Value is " + result.key);
// });

 chrome.storage.local.get(["highlights"]).then((result) => {
  const highlights = result.highlights??[]

  highlights.unshift({
    id: Date.now().toString(),
    text: request.text
  })

    chrome.storage.local.set({ highlights }).then(() => {
        sendResponse({success: true})
    });

});
return true
    
})