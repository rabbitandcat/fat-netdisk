import React from 'react'
import { Button, Space, Input, Breadcrumb, Table } from "antd";
import { UploadOutlined } from "@ant-design/icons";


type PropTypes = {
    fileUpload: () => void;
    // selectedItems: string[];
    // onDownload: () => void;
    // onDelete: () => void;
  };

const HeaderButtonGroup: React.FC<PropTypes> = params => {
    return (
        <Space size="middle" className="transfer-btns">
            <Button size="middle" onClick={params.fileUpload}><UploadOutlined />上传文件</Button>
            <Button size="middle">下载</Button>
            <Button size="middle">删除</Button>
        </Space>
    )
}

export default HeaderButtonGroup