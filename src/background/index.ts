console.info('chrome-ext template-react-ts background script');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.storage.local.set({ politicsData: request.politicsData }, function () {
    console.log('Value is set to', request.politicsData);
  });
});

export {};
