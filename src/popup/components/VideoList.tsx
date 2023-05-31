import { useState } from 'react';
import { sampleVideoList } from './sample';
import { formatDistanceToNow,isToday } from 'date-fns';
import ko from 'date-fns/locale/ko';
export interface VideoListDto {
  videoId: string
  title: string
  description: string
  thumbnailUrl: string
  publishedAt: string
  channelId: string
  channelTitle: string
  url : string
  viewCount : 0

}


export const VideoList = ({videos}  : { videos: VideoListDto[]}) => {
  return (
    <div className='mx-8'>
      <h1 className='ml-7 mt-8 mb-4 text-[24px] font-semibold'>팝필터버블이 추천하는 영상 리스트</h1>
      <div className="p-4 flex overflow-x-auto ">
        {videos && videos.map((video, index) => (
          <div key={index} className="flex mx-3">
            <VideoComponent {...video} />
          </div>
        ))}
      </div>
    </div>
  );
};

const VideoComponent = ({
  videoId,
  title,
  description,
  thumbnailUrl,
  publishedAt,
  channelId,
  channelTitle,
  url,
  viewCount,

}: VideoListDto) => {
  
  const targetDate = Date.parse(publishedAt);
  const distanceInWords = formatDistanceToNow(targetDate,{locale : ko});
  const now = new Date();

  // if (isToday(targetDate)) {
  //   const hours = Math.floor((now.getTime() - targetDate.getTime()) / (1000 * 60 * 60));
  //   if (hours > 0) {
  //     distanceInWords = `${hours}시간 전`;
  //   }
  // }

  let formattedTime = distanceInWords + ' 전';

  if (distanceInWords.includes('일')) {
    const days = parseInt(distanceInWords, 10);
    if (days >= 30) {
      const months = Math.floor(days / 30);
      formattedTime = `${months}개월 전`;
    }
  
  }
  let formattedCount = formatViewCount(viewCount);
  function formatViewCount(viewCount: number): string {
    if (viewCount < 1000) {
      return viewCount.toString();
    } else if (viewCount < 10000) {
      return `${viewCount}회`;
    } else {
      const formattedCount = (viewCount / 10000).toFixed(1);
      return `${formattedCount}만회`;
    }
  }

  

  

  return (
    <div
      className="w-[360px] h-[332px] mb-2 gap-2 "

    >
      <a href={url} className="w-[359px]  flex-shrink-0 relative">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className=" w-[359px] h-[202px] rounded-[12px] transition-opacity duration-500"
        />
        
      </a>

      <div className="flex mt-3">
        <div>
          <img
            id="img"
            draggable="false"
            className="style-scope rounded-full  mr-3"
            alt=""
            width="36"
            src="https://yt3.ggpht.com/ytc/AGIKgqNY9zCJ9lqPfMA6kAvHkse3yAXIAv2pZrFQqdgK5A=s68-c-k-c0x00ffffff-no-rj"
          />
        </div>
        <div>
          <h2 className="mb-[4px] w-[286px] text-[16px] overflow-hidden line-clamp-2 cursor-pointer font-medium">
            {title}
          </h2>
          <div>
            <p className="text-[14px] cursor-pointer leading-6 mb-2">{channelTitle}</p>
            <p className="text-[14px] cursor-pointer leading-5">
              조회수 {formattedCount} · {formattedTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoList;
