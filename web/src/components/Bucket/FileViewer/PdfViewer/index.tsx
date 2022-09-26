import React from 'react'

interface PropsType {
    url?: string
}

const ImageViewer: React.FC<PropsType> = (params) => {    
    return <embed src={"http://" + params.url} className="pdf-viewer" type="application/pdf" />
}


export default ImageViewer
