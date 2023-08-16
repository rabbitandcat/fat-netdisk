import React, { useRef, useState, useEffect } from "react";
import VideoThumbnail from "react-video-thumbnail"; // 使用npm发布的版本
import Slider from "react-slick"; // 使用npm发布的版本

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// 定义PropsType接口，包含url属性
interface PropsType {
  url: string;
}

// 定义VideoViewer组件，接收PropsType类型的参数
const VideoViewer: React.FC<PropsType> = (params) => {
  // 定义一个ref，用于获取video元素的引用
  const videoRef = useRef<HTMLVideoElement>(null);
  // 定义一个state，用于存储视频的时长（默认为0）
  const [duration, setDuration] = useState(0);
  // 定义一个state，用于存储视频的缩略图数组（默认为空）
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  // 定义一个变量，用于控制生成缩略图的间隔（默认为10秒）
  const interval = 10;

  useEffect(() => {
    console.log('haha', thumbnails)
  }, [thumbnails])

  // 定义一个函数，用于在视频加载完成后获取视频时长，并生成缩略图数组
  const handleLoadedMetadata = () => {
    // 如果videoRef存在，则获取其current属性
    if (videoRef && videoRef.current) {
      // 获取视频时长，并向下取整
      const videoDuration = Math.floor(videoRef.current.duration);
      // 将视频时长存储到state中
      setDuration(videoDuration);
      // 清空缩略图数组
      setThumbnails([]); // 或者 thumbnails.length = 0;
      // 定义一个空数组，用于存储缩略图
      const tempThumbnails: string[] = [];
      // 遍历视频时长，每隔interval秒生成一个缩略图
      for (let i = 0; i < videoDuration; i += videoDuration / interval) { 
        console.log('循环了多少次', i, 'videoDuration', videoDuration, 'interval', interval);
        // 使用react-video-thumbnail组件生成缩略图，并传入视频url和截取时间
        tempThumbnails.push(
          <VideoThumbnail
            key={i}
            videoUrl={"http://" + params.url}
            snapshotAtTime={i}
            width={100} // 添加了width属性
            height={60} // 添加了height属性
            className={"thumbnail"}
            renderThumbnail={(dataURL: string) => { 
              return <img src={dataURL} alt="thumbnail" />;
            }}
          />
        );
      }
      // 将缩略图数组存储到state中
      setThumbnails(tempThumbnails);
    }
  };

  // 定义一个函数，用于在用户点击缩略图时跳转到对应的视频时间点
  const handleClickThumbnail = (index: number) => {
    // 如果videoRef存在，则获取其current属性
    if (videoRef && videoRef.current) {
      // 跳转到指定的时间点，并播放视频
      videoRef.current.currentTime = index * interval;
      videoRef.current.play();
    }
  };

  // 定义一个对象，用于设置react-slick组件的属性
  const settings = {
    dots: false, // 不显示圆点导航
    infinite: false, // 不循环播放
    speed: 500, // 切换速度（毫秒）
    slidesToShow: 10, // 同时显示的幻灯片数量
    slidesToScroll: 10, // 每次滚动的幻灯片数量
    centerMode: false, // 添加了centerMode属性
    centerPadding: "0px", // 添加了centerPadding属性,
    vertical: false, // 添加了vertical属性
    // width: 100, // 添加了width属性
    // height: 60, // 添加了height属性
  };

  return (
    <div className="video-viewer">
      {/* 显示视频元素，并传入url和ref属性，以及加载完成后的回调函数 */}
      <video
        src={"http://" + params.url}
        ref={videoRef}
        controls
        onLoadedMetadata={handleLoadedMetadata}
        className="video-player"
        preload="auto" // 设置预加载行为为自动
        autoPlay={true}
      >
        您的浏览器不支持 video 标签。
      </video>
      {/* 显示缩略图元素，并使用react-slick组件实现滑动效果 */}
      <Slider {...settings} className="thumbnail-list">
        {thumbnails.map((thumbnail, index) => (
          // 给每个缩略图添加一个点击事件，传入索引值作为参数
          <div key={index} onClick={() => handleClickThumbnail(index)} className="thumbnail-item">
            {thumbnail}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VideoViewer;
