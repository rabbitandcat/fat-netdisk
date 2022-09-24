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

export const downloadSingleFile = (myURL: string, index: number, db: (transfers: any) => void, transferList: any) => {
    return fileHttp({
        method: 'GET',
        url: "http://" + myURL,
        responseType: 'blob',
        headers:{ 'Content-Type': 'application/json; application/octet-stream'},
        onDownloadProgress(progressEvent){
            if(progressEvent.lengthComputable){
                // 改变数组内存指向地址
                db([...transferList]);
                transferList[index].progress = (progressEvent.loaded / progressEvent.total * 100).toFixed(2);
                db([...transferList]);
            }
        },
    })
}
