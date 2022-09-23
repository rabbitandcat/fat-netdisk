import React from 'react'
import { Button, Space, Input, Breadcrumb, Table, Upload, UploadProps, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { downloadFileList, uploadFileList } from '../../../api/bucket';
import VFolder from '../../../lib/vdir/VFolder'

type PropTypes = {
    vFolder: VFolder
    selection: any
};

const HeaderButtonGroup: React.FC<PropTypes> = params => {

    const handleDownload = async () => {
        let fileNameList = params.selection.fileNames
        let prefix = params.vFolder.navigator.join('/')
        try {
            const res: any = await downloadFileList(fileNameList, prefix)
            const urlList = res.urlList
            console.log('urlList', urlList);

            urlList.forEach((myURL: string, index: number) => {
                const url = "http://" + myURL
                fetch(url).then(async res => await res.blob()).then((blob) => {
                    // 创建隐藏的可下载链接
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = URL.createObjectURL(blob);
                    // 保存下来的文件名
                    a.download = fileNameList[index];
                    document.body.appendChild(a);
                    a.click();
                    // 移除元素
                    document.body.removeChild(a);
                })
            })
        } catch (error) {
            console.log(error);
            message.error("下载失败")
        }
    }

    const props: UploadProps = {
        showUploadList: false,
        beforeUpload: async (file) => {
            let newPath = params.vFolder.navigator.join("/");
            console.log(newPath);

            const formData = new FormData();
            formData.append('file', file);

            try {
                const res = await uploadFileList(formData, newPath)
                message.success('上传成功')
                console.log(res);
            } catch (error) {
                message.error('上传失败')
            }

            return false;
        },
    };


    return (
        <Space size="middle" className="transfer-btns">
            <Upload {...props}>
                <Button size="middle"><UploadOutlined />上传文件</Button>
            </Upload>
            <Button size="middle" onClick={handleDownload}>下载</Button>
            <Button size="middle">删除</Button>
        </Space>
    )
}

export default HeaderButtonGroup