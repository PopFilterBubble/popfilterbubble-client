console.info('pop-filterbubble-client content script');

interface VideoData {
  channelId: string;
}
let videoLength = 0;
function extractVideoData(): void {
  const videoList = document.querySelectorAll<HTMLDivElement>('#contents ytd-rich-item-renderer');
  const videoDataList: VideoData[] = [];

  for (const video of videoList) {
    const channelElement = video.querySelector<HTMLDivElement>(
      '#channel-name #text-container a',
    ) as any;
    const channelId = channelElement
      ? new URL(channelElement.href).href.split('/').reverse()[0]
      : '';
    if(channelId == '') continue;
    videoDataList.push({
      channelId,
    });
  }
  
  const arr = videoDataList.slice(videoLength);
  console.log(arr);
  videoLength = videoDataList.length;


}

function observeScrollEnd(): void {
  const targetNode = document.querySelector<HTMLElement>(
    '#page-manager ytd-rich-grid-renderer #contents',
  ) as any;
  const config = { childList: true, subtree: true };

  if (!targetNode) {
    console.log('retry');
    setTimeout(() => observeScrollEnd(), 1000);
    return;
  }
  extractVideoData();
  let scrollTimeout: ReturnType<typeof setTimeout>;

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type !== 'childList' || mutation.target.nodeName != 'YTD-RICH-GRID-ROW') {
        continue;
      }
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        extractVideoData();
      }, 1000);
    }
  });

  observer.observe(targetNode, config);
}

observeScrollEnd();
