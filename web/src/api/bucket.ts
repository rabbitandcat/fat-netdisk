import http from './http'

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
        data
    })
}

export const downloadFileList = (fileNameList: string[], prefix: string) => {
    return http({
        method: 'POST',
        url: '/DownloadFile',
        data: {
            fileNameList,
            prefix
        }
    })
}