// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log('bg:chrome.extension.onMessage.addListener:request', request);
        chrome.pageAction.show(sender.tab.id);
        sendResponse();
    });

chrome.runtime.onInstalled.addListener(function () {
    // When the app gets installed, set up the context menus
    function textContextAction(info, tab) {
        console.log('bg:textContextAction', arguments);

        // chrome.runtime.sendMessage('contextAction', {
        //     data: arguments
        // }, function (response) {
        //     console.log('bg:s 223', response);
        // });
        //
        // chrome.tabs.create({url: "http://maps.google.com/maps?q=" + action})
    }

    chrome.contextMenus.create({
        title: "TaaS bg",
        contexts: ["selection"],
        onclick: textContextAction
    });
});
