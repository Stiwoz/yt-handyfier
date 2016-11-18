
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  setTimeout(function(){
    var s = document.createElement('script');
    s.src = chrome.extension.getURL('src/inject.js');
    s.onload = function() {
        // this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
    console.log('>>>> APPESO');
  }, 500);
});
