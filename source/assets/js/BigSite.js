chrome.browserAction.onClicked.addListener(function(tab){
    chrome.tabs.insertCSS(tab.id, { file: "assets/styles/BigSiteContent.css" }, function(){
        chrome.tabs.executeScript(tab.id, { file: "assets/js/BigSiteContent.js" });
    });
});
