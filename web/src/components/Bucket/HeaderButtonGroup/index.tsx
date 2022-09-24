import React from 'react'
import { Button, Space, Input, Breadcrumb, Table, Upload, UploadProps, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { deleteFileList, downloadFileList, uploadFileList, downloadSingleFile } from '../../../api/bucket';
import VFolder from '../../../lib/vdir/VFolder'

type PropTypes = {
    vFolder: VFolder
    selection: any
    handleDownload: () => void
    handleDelete: () => void
};

const HeaderButtonGroup: React.FC<PropTypes> = params => {

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
            <Button size="middle" onClick={params.handleDownload}>下载</Button>
            <Button size="middle" onClick={params.handleDelete}>删除</Button>
        </Space>
    )
}

export default HeaderButtonGroup