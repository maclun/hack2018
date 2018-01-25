console.log('Page action loaded.');

$('#highlight').click(function () {
    console.log("CLICKED jQuery");
    activateHighlight();
});

// document.getElementById('highlight').addEventListener('click', function () {
//     console.log('clicked!')
// });


function activateHighlight() {
    console.log("Activate highlight...");

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "highlight", function (response) {
            console.log('es 223', response.farewell);
        });
    });
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");

        if (request == "highlighted") {
            sendResponse("es message received 444");
        }

        return true;
    });