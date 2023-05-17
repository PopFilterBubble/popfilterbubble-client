import { useState } from 'react';
import { sampleVideoList } from './sample';
export interface VideoListDto {
  videoId: string
  title: string
  description: string
  thumbnailUrl: string
  publishedAt: string
  channelId: string
  channelTitle: string
}


export const VideoList = ({videos}  : { videos: VideoListDto[]}) => {
  return (
    <div className='mx-8'>
      <h1 className='ml-7 mt-8 mb-4 text-[24px] font-semibold'>팝필터버블이 추천하는 영상 리스트</h1>
      <div className="p-4 flex overflow-x-auto ">
        {videos.map((video, index) => (
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
}: VideoListDto) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseOver = () => {
    const timeout = setTimeout(() => {
      setIsHovered(true);
    }, 200);
    setHoverTimeout(timeout);
  };

  const handleMouseOut = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setIsHovered(false);
  };

  return (
    <div
      className="w-[360px] h-[332px] mb-2 gap-2 "
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <a href="https://www.youtube.com" className="w-[359px]  flex-shrink-0 relative">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="object-cover w-[359px] h-[202px] rounded-[12px] transition-opacity duration-500"
        />
        {/* <img
          src={preview}
          alt="video preview"
          className={`object-fill rounded-[12px] absolute top-0 left-0 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        /> */}
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
              조회수 {/*{views}*/} · {publishedAt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoList;
