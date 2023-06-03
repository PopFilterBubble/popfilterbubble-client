import '../tailwind.css';
import { createRoot } from 'react-dom/client';
import VideoList from '../popup/components/VideoList';
import { getVideosAPI } from '../apis/service';

console.info('pop-filterbubble-client content script');

export interface VideoListDto {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  channelId: string;
  channelTitle: string;
  url: string;
  viewCount: 0;
}

export interface PoliticsDTO {
  conservative: string;
  etc: string;
  progressive: string;
  unclassified: string;
}

let originChannelIDListLength = 0;

function extractVideoData(): void {
  const videoElements = document.querySelectorAll<HTMLDivElement>('#contents ytd-rich-item-renderer');
  const channelIDList: string[] = [];

  for (const videoElement of videoElements) {
    const channelElement = videoElement.querySelector<HTMLDivElement>(
      '#channel-name > div > div > yt-formatted-string > a',
    ) as any;
    const channelId = channelElement
      ? new URL(channelElement.href).href.split('/').reverse()[0]
      : '';
    if (channelId == '') continue;
    channelIDList.push(channelId);
  }
  
  if (originChannelIDListLength == channelIDList.length) {
    return
  }
  console.log('[DOM] chanelIdList length: ', channelIDList.length);
  originChannelIDListLength = channelIDList.length;

  if (originChannelIDListLength !== 0) {
    getYoutubeAPI(channelIDList);
  }
}

async function getYoutubeAPI(channelIdArr: string[]) {
  console.log('API HOST START');
  const response = await getVideosAPI(channelIdArr);

  if (response.status == 200 && response.data) {
    console.log('API SUCCESS!');
    const data = response.data;
    console.log(data.videoListDTO);
    console.log(data.politicsDTO);
    
    sendPoliticsDataToBackground(data.politicsDTO);
    insertCustomComponent(data.videoListDTO);
  }
  else {
    console.log("API FAIL!")
    console.log(response);

  }
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

function insertCustomComponent(videos: VideoListDto[]) {
  const nextElement = document.getElementById('contents');
  let container = document.getElementById('my-custom-container');

  // Create a container if it doesn't exist yet
  if (!container) {
    container = document.createElement('div');
    container.id = 'my-custom-container'; // Assign an ID to the container
    container.style.width = '100%';
    
    // Check if the nextElement exists
    if (nextElement && nextElement.parentElement) {
      // Insert the container right before the nextElement
      nextElement.parentElement.insertBefore(container, nextElement);
    } else {
      console.warn('Element with ID "contents" not found.');
      return;
    }
  } else {
    // If container already exists, clear its contents
    container.innerHTML = '';
  }

  // Create a root and render the React component into the container
  const root = createRoot(container);
  root.render(<VideoList videos={videos} />);
}

function sendPoliticsDataToBackground(data: PoliticsDTO) {
  chrome.runtime.sendMessage({ politicsData: data });
}

// Initial insert

chrome.storage.local.remove('politicsData', function() {
  console.log('politicsData has been removed');
});

observeScrollEnd();
