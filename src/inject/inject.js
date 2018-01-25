chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            // ----------------------------------------------------------
            // This part of the script triggers when page is done loading
            console.log("Hello. This message was sent from scripts/inject.js");

            // ----------------------------------------------------------

            // chrome.runtime.sendMessage('highlighted', function (response) {
            //     console.log('cs 123', response);
            // });

        }
    }, 10);
});

function readCurrentLanguage() {
    return 'dk';
}

var highlighted = false;

function markTranslatable() {
    var translatableElements = $('[track-id]');

    highlighted = !highlighted;

    for (var i = 0; i < translatableElements.length; i++) {
        var $el = $(translatableElements[i]);
        $el.toggleClass('taas__highlight', highlighted);

        $el.contextmenu(function () {
            console.log('csContext menu', arguments);
        });
    }
}

function injectScript(file, node) {
    console.log('file', file);

    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}

// injectScript(chrome.extension.getURL('/src/var_reader.js'), 'body');

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log('cs:' + (sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension"));

        console.log('cs:request', request);
        if (request == "highlight") {
            console.log('cs:got highlight');
            sendResponse("message received 444");
            markTranslatable();
        } else if (request == "contextAction") {
            console.log('cs:contextAction', arguments);
        }

        return true;
    });