console.info('pop-filterbubble-client content script');
const root = document.documentElement;

setInterval(()=> {
  const videoList = root.querySelectorAll('#text > a');
  const linkToArr = Array.from(videoList);
  
  const newVideoList = linkToArr.map((a,idx) => {
    if (a instanceof HTMLAnchorElement) {
      let href = a.href; 
      let channelId = href .replace('https://www.youtube.com/','');
      return channelId;
    }
  });
  console.log(newVideoList);
},5000);

export {};
