import '../tailwind.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import VideoList from '../popup/components/VideoList';
import { getDummy, popFilterAPI } from '../apis/service';
import axios from 'axios';

console.info('pop-filterbubble-client content script');

export interface VideoListDto {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  channelId: string;
  channelTitle: string;
}

export interface PoliticsDTO {
  conservative: string;
  etc: string;
  progressive: string;
  unclassified: string;
}

let videoLength = 0;
let videos: VideoListDto[] | null = null;

function extractVideoData(): void {
  const videoList = document.querySelectorAll<HTMLDivElement>('#contents ytd-rich-item-renderer');
  const videoDataList: string[] = [];

  for (const video of videoList) {
    const channelElement = video.querySelector<HTMLDivElement>(
      '#channel-name #text-container a',
    ) as any;
    const channelId = channelElement
      ? new URL(channelElement.href).href.split('/').reverse()[0]
      : '';
    if (channelId == '') continue;
    videoDataList.push(channelId);
  }

  const chanelIdArr = videoDataList.slice(videoLength);
  console.log(chanelIdArr);

  videoLength = videoDataList.length;
  if (videoLength !== 0) getDummyAPI(chanelIdArr);
}

async function getDummyAPI(channelIdArr: string[]) {
  const response = await getDummy(channelIdArr);
  console.log(response.data.videoListDTO);

  if (response.status === 200) {
    console.log('API SUCCESS!');
    const data = response.data;
    videos = data.videoListDTO;
    sendPoliticsDataToBackground(data.politicsDTO);
    insertCustomComponent();
  } else {
    console.log('API Error:', response.status);
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

window.addEventListener('resize', () => {
  if (!videos) {
    return;
  }
  insertCustomComponent();
});

function insertCustomComponent() {
  const channelId = 'your_channel_id'; // replace with your actual channel ID

  axios
    .get(`https://popfilterbubble.site/dummy/politics?channelId=${channelId}`)
    .then((response: any) => {
      console.log(response.data); // handle the response here
    })
    .catch((error: any) => {
      console.error(error); // handle the error here
    });

  // Check if the component already exists
  const existingContainer = document.getElementById('my-custom-container');
  if (existingContainer) {
    return; // The component already exists, so we do nothing
  }

  // Create a container for your custom layout
  const container = document.createElement('div');
  container.id = 'my-custom-container'; // Assign an ID to the container
  // container.style.backgroundColor = '#FFFFEE';
  container.style.width = '100%';
  //container.style.paddingLeft = '24px'
  //container.style.paddingRight = '24px';
  //container.style.border = '1px solid black';

  const nextElement = document.getElementById('contents'); // replace 'next-element-id' with the actual ID

  // Check if the nextElement exists
  if (nextElement && nextElement.parentElement) {
    // Insert the container right before the nextElement
    nextElement.parentElement.insertBefore(container, nextElement);

    // Create a root and render the React component into the container
    const root = createRoot(container);
    root.render(<VideoList videos={videos!} />);
  } else {
    console.warn('Element with ID "next-element-id" not found.'); // replace 'next-element-id' with the actual ID
  }
}

function sendPoliticsDataToBackground(data: PoliticsDTO) {
  chrome.runtime.sendMessage({ politicsData: data });
}

// Initial insert
observeScrollEnd();
