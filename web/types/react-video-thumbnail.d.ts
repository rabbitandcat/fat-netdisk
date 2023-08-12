declare module "react-video-thumbnail" {
    import React from "react";
  
    interface VideoThumbnailProps {
      videoUrl: string;
      cors?: boolean;
      height?: number;
      renderThumbnail?: boolean;
      snapshotAtTime?: number;
      thumbnailHandler?: (thumbnail: string) => void;
      width?: number;
    }
  
    export default class VideoThumbnail extends React.Component<VideoThumbnailProps> {}
  }
  