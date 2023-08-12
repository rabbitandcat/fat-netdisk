import React, { useState, useEffect } from "react";
import VideoThumbnail from "react-video-thumbnail";
import Slider from "react-slick";

interface PropsType {
  url: string;
}

const VideoViewer: React.FC<PropsType> = (params) => {
  // 设置一个缩略图数组的状态
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  // 设置一个轮播图的配置对象
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // 定义一个生成缩略图的函数，接收一个时间参数
  const generateThumbnail = (time: number) => {
    return (
      <VideoThumbnail
        key={time}
        videoUrl={"http://" + params.url}
        cors={true} // 设置CORS为true
        snapshotAtTime={time} // 设置截取时间
        thumbnailHandler={(thumbnail) => {
          // 设置缩略图处理函数，将生成的base64数据添加到数组中
          setThumbnails((prev) => [...prev, thumbnail]);
        }}
        width={200} // 设置缩略图宽度
        height={150} // 设置缩略图高度
      />
    );
  };

  // 定义一个渲染轮播图的函数，接收一个缩略图数组参数
  const renderSlider = (thumbnails: string[]) => {
    return (
      <Slider {...settings}>
        {thumbnails.map((thumbnail, index) => (
          <div key={index}>
            <img src={thumbnail} alt={`thumbnail-${index}`} /> // 使用img标签显示base64数据
          </div>
        ))}
      </Slider>
    );
  };  

  // 使用useEffect在组件挂载时生成一些缩略图，你可以自己修改时间间隔和数量
  useEffect(() => {
    generateThumbnail(0); // 第0秒
    generateThumbnail(5); // 第5秒
    generateThumbnail(10); // 第10秒
    generateThumbnail(15); // 第15秒
    generateThumbnail(20); // 第20秒
  }, []);

  return (
    <div>
      <video src={"http://" + params.url} controls className="video-viewer" crossOrigin="anonymous">
        您的浏览器不支持 video 标签。
      </video>
      {thumbnails.length > 0 && renderSlider(thumbnails)} // 如果缩略图数组不为空，就渲染轮播图
    </div>
  );
};

export default VideoViewer;
