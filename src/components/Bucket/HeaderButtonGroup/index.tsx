import React from 'react'
import { Button, Space, Input, Breadcrumb, Table } from "antd";
import { UploadOutlined } from "@ant-design/icons";


const HeaderButtonGroup: React.FC = () => {
    return (
        <Space size="middle" className="transfer-btns">
            <Button size="middle"><UploadOutlined />上传文件</Button>
            <Button size="middle">下载</Button>
            <Button size="middle">删除</Button>
        </Space>
    )
}

export default HeaderButtonGroup