console.info('chrome-ext template-react-ts content script');

const root = document.documentElement;
let videoList = root.querySelectorAll('#video-title-link');
let LinktoArr = Array.from(videoList);
LinktoArr.map((a,idx) => {
  if (a instanceof HTMLAnchorElement) {
    let href = a.href; 
    let params = href .substring( href .indexOf('=')+1, href .length );
    console.log(idx, params);
  }
});

//개수가 24개 이하면 처리

/*function getVideoId () {
    for(let i :number = 0; i < videoList.length; i++) {
        if (videoList[i] instanceof HTMLAnchorElement) {
            let href = videoList[i].href; 
          }
        
    }

};
console.log(root.innerHTML);*/

export {};
