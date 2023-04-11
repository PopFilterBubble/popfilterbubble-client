console.info('pop-filterbubble-client content script');
const root = document.documentElement;
let originVideoListLength = 0;

//문제 2 : 이게 npm run dev 하지않아도 계속 소스를 받아오는데 왜그런지...?알수가없네...코드가 계속 돌아가는건가..?

setInterval(() => {
  const videoList = root.querySelectorAll('#text > a');
  const linkToArr = Array.from(videoList);

  let newVideoListLength = 0;
  if (originVideoListLength === 0) {
    //만약 아예 받아온 데이터가 없으면!
    newVideoListLength = getChannelIdList(linkToArr);
  } else if (linkToArr.length > originVideoListLength) {
    //새로운 값이 들어올 때
    linkToArr.splice(0, originVideoListLength); //중복되는 값은 제거
    newVideoListLength = getChannelIdList(linkToArr);
  }
  //console.log(newVideoListLength);
  originVideoListLength += newVideoListLength;
  //console.log(originVideoListLength);
}, 5000);

function getChannelIdList(linkToArr: Array<Element>): number {
  const newVideoList = linkToArr.map((a, idx) => {
    if (a instanceof HTMLAnchorElement) {
      let href = a.href;
      let channelId = href.replace('https://www.youtube.com/', '').replace('channel/', '');
      if (channelId !== '') return channelId;
    }
  });
  let newVideoListLength = newVideoList.length;
  console.log(newVideoList);
  //여기서 서버에 전송하는 코드넣으면 될 듯?
  return newVideoListLength;
}

export {};
