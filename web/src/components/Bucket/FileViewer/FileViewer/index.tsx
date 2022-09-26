import React from 'react'
import ImageViewer from '../ImageViewer'
import PdfViewer from '../PdfViewer'
import VideoViewer from '../VideoViewer'
import './index.scss'


type PropsType = {
    visible: boolean
    setVisible: (visible: boolean) => void
    openType: string
    openUrl: string
}

const FileViewer: React.FC<PropsType> = (params) => {

    const renderViewer = (openType: string) => {
        switch (openType) {
            case "image/jpeg":
                console.log('显示图片');

                return <ImageViewer
                    url={params.openUrl}
                />
            case "application/pdf":
                return <PdfViewer 
                    url={params.openUrl}
                />
            case "video/mp4":
                return <VideoViewer
                    url={params.openUrl}
                />
            default:
                return null
        }
    }

    return (
        <div className="file-viewer" style={{ display: (params.visible ? 'block' : 'none') }}>
            <div className="close" onClick={() => params.setVisible(false)}>x</div>
            <div className="container">
                {renderViewer(params.openType)}
            </div>
        </div>
    )
}

export default FileViewer
