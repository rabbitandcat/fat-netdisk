import React from 'react'

interface PropsType {
    url?: string
}

const ImageViewer: React.FC<PropsType> = (params) => { 
    console.log('params.url是', params.url);
    return <img src={"http://" + params.url} className="image-viewer" />
}


export default ImageViewer
