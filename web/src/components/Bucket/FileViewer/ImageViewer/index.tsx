import React from 'react'

interface PropsType {
    url?: string
}

const ImageViewer: React.FC<PropsType> = (params) => {
    console.log('图片预览器',params.url);
    
    return <img src={"http://" + params.url} className="imageViewer" />
}


export default ImageViewer
