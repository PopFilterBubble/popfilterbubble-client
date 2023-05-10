import React from 'react';
import { render } from 'react-dom';
import VideoList from '../popup/components/VideoList';
import { createRoot } from 'react-dom/client';

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
// insertCustomComponent();

window.addEventListener('resize', () => {
  insertCustomComponent();
});

function insertCustomComponent() {
  // Check if the component already exists
  const existingContainer = document.getElementById('my-custom-container');
  if (existingContainer) {
    return; // The component already exists, so we do nothing
  }

  // Create a container for your custom layout
  const container = document.createElement('div');
  container.id = 'my-custom-container'; // Assign an ID to the container
  container.style.backgroundColor = 'white';
  container.style.padding = '10px';
  container.style.border = '1px solid black';

  const nextElement = document.getElementById('contents'); // replace 'next-element-id' with the actual ID

  // Check if the nextElement exists
  if (nextElement && nextElement.parentElement) {
    // Insert the container right before the nextElement
    nextElement.parentElement.insertBefore(container, nextElement);

    // Create a root and render the React component into the container
    const root = createRoot(container);
    root.render(<VideoList />);
  } else {
    console.warn('Element with ID "next-element-id" not found.'); // replace 'next-element-id' with the actual ID
  }
}

// Initial insert
insertCustomComponent();


