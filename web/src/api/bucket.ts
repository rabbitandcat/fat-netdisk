import fileHttp from './fileHttp'
import http from './http'
import TransferList from '../components/TransferList'

export const getBucketFileList = () => {
    return http({
        method: 'GET',
        url: '/BucketFileList'
    })
}


export const uploadFileList = (data: any, newPath?: string) => {
    return http({
        method: 'POST',
        url: `/UploadFile?prefix=${newPath}`,
        onUploadProgress(progressEvent){
            if(progressEvent.lengthComputable){
                console.log(progressEvent);      
            }
        },
        data
    })
}

export const downloadFileList = (fileNameList: string[], prefix: string) => {
    return http({
        method: 'POST',
        url: '/DownloadFile',
        onDownloadProgress(progressEvent){
            if(progressEvent.lengthComputable){
                console.log(progressEvent);
            }
        },
        data: {
            fileNameList,
            prefix
        }
    })
}

export const deleteFileList = (fileNameList: string[], prefix: string) => {
    return http({
        method: 'DELETE',
        url: '/DeleteFile',
        data: {
            fileNameList,
            prefix
        }
    })
}

export const downloadSingleFile = (myURL: string, index: number) => {
    return fileHttp({
        method: 'GET',
        url: "http://" + myURL,
        responseType: 'blob',
        headers:{ 'Content-Type': 'application/json; application/octet-stream'},
        onDownloadProgress(progressEvent){
            if(progressEvent.lengthComputable){
                console.log(progressEvent);      
            }
        },
    })
}
