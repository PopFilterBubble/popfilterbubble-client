console.info('pop-filterbubble-client content script');
const root = document.documentElement;
let originLength = 0;
setInterval(() => {
  const videoList = root.querySelectorAll('#text > a');
  const linkToArr = Array.from(videoList);
  let updateLength = 0;
  if (originLength === 0) {
    //만약 아예 받아온 데이터가 없으면!
    updateLength = getChannelIdList(linkToArr);
  } else if (linkToArr.length > originLength) {
    //새로운 값이 들어올 때
    linkToArr.splice(0, originLength); //중복되는 값은 제거
    updateLength = getChannelIdList(linkToArr);
  }
  originLength += updateLength;
}, 5000);

function getChannelIdList(linkToArr: Array<Element>): number {
  const newVideoList = linkToArr.map((a, idx) => {
    if (a instanceof HTMLAnchorElement) {
      const href = a.href;
      const channelId = href.split('/').reverse()[0];
      return channelId;
    }
  });
  let updateLength = newVideoList.length;
  console.log(newVideoList);
  //여기서 서버에 전송하는 코드넣으면 될 듯?
  return updateLength;
}

export {};
