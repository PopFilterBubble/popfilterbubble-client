import { useState } from 'react';
import { sampleVideoList } from './sample';

export const VideoList = () => {
  return (
    <div className="p-4 flex overflow-x-auto mx-8 ">
      {sampleVideoList.map((video, index) => (
        <div className='flex mx-3  '>
          <VideoComponent key={index} {...video} />

        </div>
        
      ))}
    </div>
    //<VideoComponent {...sampleVideoList[0]} />
  );
};

type VideoRowProps = {
  thumbnail: string;
  preview: string;
  title: string;
  channelName: string;
  views: string;
  uploadedAt: string;
};

const VideoComponent = ({
  thumbnail,
  preview,
  title,
  channelName,
  views,
  uploadedAt,
}: VideoRowProps) => {
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
      <a href="https://www.youtube.com" className="w-[356px]  flex-shrink-0 relative">
        <img
          src={thumbnail}
          alt="video thumbnail"
          className="object-fill rounded-[12px] transition-opacity duration-500"
        />
        <img
          src={preview}
          alt="video preview"
          className={`object-fill rounded-[12px] absolute top-0 left-0 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
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
          <h2 className="mb-[4px] w-[286px] text-[16px] overflow-hidden line-clamp-2 cursor-pointer">
            {title}
          </h2>
          <div>
            <p className="text-[#606060] text-[14px] cursor-pointer leading-6 mb-2" >{channelName}</p>
            <p className="text-[#606060] text-[14px] cursor-pointer leading-5">
              조회수 {views} · {uploadedAt}
            </p>
          </div>
          </div>
          
    </div>
    </div>
  );
};

export default VideoList;
