import React from 'react'

interface PropsType {
    url?: string
}

const ImageViewer: React.FC<PropsType> = (params) => {
    return <img src={params.url} className="imageViewer" />
}


export default ImageViewer
