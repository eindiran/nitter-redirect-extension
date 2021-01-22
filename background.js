/**
 * background.js
 *
 * This handles redirecting Twitter links to Nitter (nitter.net).
 */

const nitterUrl       = "https://nitter.net";
const twitterUrlRegex = /^https?:\/\/.*\.?twitter\.com/;
var   enabled         = true;

// Add a listener responsible for redirecting Twitter requests to Nitter:
extensionApi.webRequest.onBeforeRequest.addListener(
    // Define the function used by the listener:
    function(details) {
        if (enabled) {
            // First, check if the add-on is enabled
            return {
                redirectUrl: details.url.replace(twitterUrlRegex, nitterUrl)
            };
        } else {
            return;
        }
    },
    // `filter` argument:
    {
        // Which urls should the listener respond to:
        urls: [
            "*://www.twitter.com/*",
            "*://twitter.com/*",
            "*://mobile.twitter.com/*",
        ],
        // Which Web Request types should the listener respond to:
        types: [
            "image",
            "script",
            "main_frame",
            "sub_frame",
            "xmlhttprequest"
        ]
    },
    // `extraInfoSpec`: uses `blocking` to make the request synchronous
    // See here: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onBeforeRequest
    ["blocking"]
);

// Add browser actions to disable the icon:
// See here: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction
extensionApi.browserAction.onClicked.addListener(
    // Icon toggling function
    function() {
        enabled = !enabled;
        if (enabled) {
            // Make sure the icon is enabled:
            extensionApi.browserAction.setIcon({
                "path": {
                    "48":  "img/icon48-enabled.png",
                    "128": "img/icon128-enabled.png"
                }
            });
        } else {
            // Make sure the icon is disabled:
            extensionApi.browserAction.setIcon({
                "path": {
                    "48":  "img/icon48-disabled.png",
                    "128": "img/icon128-disabled.png"
                }
            });
        }
    }
);
