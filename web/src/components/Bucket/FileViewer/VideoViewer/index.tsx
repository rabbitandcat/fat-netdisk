import React from 'react'

interface PropsType {
    url?: string
}

const VideoViewer: React.FC<PropsType> = (params) => {    
    return (
        <video src={"http://" + params.url} controls className="video-viewer">
            您的浏览器不支持 video 标签。
        </video>
    )
}


export default VideoViewer
