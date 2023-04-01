import  { useState } from 'react';
import { sampleVideoList } from './sample';

export const VideoList = () => {
  return (
    <div className="mx-6">
      {sampleVideoList.map((video, index) => (
        <VideoRow key={index} {...video} />
      ))}
    </div>
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

const VideoRow = ({ thumbnail, preview, title, channelName, views, uploadedAt }: VideoRowProps) => {
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
    <div className="flex mb-2 gap-2" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <a href="https://www.youtube.com" className="w-[168px] h-[94px] flex-shrink-0 relative">
        <img
          src={thumbnail}
          alt="video thumbnail"
          className="object-fill rounded-md transition-opacity duration-500"
        />
        <img
          src={preview}
          alt="video preview"
          className={`object-fill rounded-md absolute top-0 left-0 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </a>
      <div>
        <h3 className="text-sm font-semibold overflow-hidden line-clamp-2 mb-1 cursor-pointer">
          {title}
        </h3>
        <div>
          <p className="text-xs text-[#aaaaaa] cursor-pointer">{channelName}</p>
          <p className="text-xs text-[#aaaaaa] cursor-pointer">
            조회수 {views} · {uploadedAt}
          </p>
        </div>
      </div>
    </div>
  );
};


export default VideoList;


