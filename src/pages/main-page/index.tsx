import React, { useEffect, useState } from 'react'
import './index.scss'
import '../../style/index.scss'
import FileIcon from "../../assets/images/file.png";
import DownloadIcon from "../../assets/images/download.png";
import DoneIcon from "../../assets/images/done.png";
import UserIcon from '../../assets/svg/user-line.svg'
import MoreIcon from '../../assets/svg/more-fill.svg'

import { Button, Space, Input, Breadcrumb, Table } from "antd";
import Icon from "../../components/Bucket/IconFont";
import { Item } from "../../lib/vdir/types";
import VFolder from "../../lib/vdir/VFolder";
import VFile from "../../lib/vdir/VFile";
import { UploadOutlined } from "@ant-design/icons";

import BackIcon from "../../assets/images/back.png";
import ReloadIcon from "../../assets/images/reload.png";
import SearchIcon from "../../assets/images/search.png";
import GridIcon from "../../assets/images/grid.png";
import TableIcon from "../../assets/images/table.png";
import shortid from 'shortid';


const MainPage: React.FC = () => {
    const items: Item[] = [
        {
            name: 'name1',
            webkitRelativePath: '/path',
            meta: 'meta1',
            type: 'file',
            size: 0,
            lastModified: 0,
            lastModifiedDate: new Date(),
            shortId: shortid()
        },
        {
            name: 'name2',
            webkitRelativePath: '/path',
            meta: 'meta2',
            type: 'file',
            size: 1,
            lastModified: 0,
            lastModifiedDate: new Date(),
            shortId: shortid()
        },
    ]


    const columns = [
        {
            title: "文件名",
            dataIndex: "name",
            key: "shortId",
            ellipsis: true,
            render(name: string, item: Item) {
                return (
                    <div className="file-meta">
                        <Icon
                            type={'icon-documents'}
                            className="file-icon"
                        />
                        <div className="file-name">{name}</div>
                    </div>
                );
            }
        },
        {
            title: "大小",
            dataIndex: "size",
            key: "size",
            sorter: (a: Item, b: Item) => a.size - b.size,
            ellipsis: true,
            render(size: number) {
                return "0 Bytes";
            }
        },
        {
            title: "修改日期",
            dataIndex: "lastModified",
            key: "lastModified",
            ellipsis: true,
            sorter: (a: Item, b: Item) => a.lastModified - b.lastModified,
            render(timestamp: number) {
                return "YYYY年MM月DD日 HH:mm:ss";
            }
        }
    ];



    return (
        <div className="main-page">
            <div className="side-bar">
                <div className="top-wrapper">
                    <div className="title">Fat-NetDisk</div>
                </div>
                <ul className="nav-menu">
                    <li className="nav-files">
                        <img className="icon" src={FileIcon} alt="" />
                        <div className="name">文件</div>
                    </li>
                    <li className="nav-transfer-list">
                        <img className="icon" src={DownloadIcon} alt="" />
                        <div className="name">传输列表</div>
                    </li>
                    <li className="nav-transfer-done-list">
                        <img className="icon" src={DoneIcon} alt="" />
                        <div className="name">传输完成</div>
                    </li>
                </ul>

                <div className="bottom-wrapper">
                    <div className="bottom-user-info">
                        <img className="user-avatar" src={UserIcon} alt="" />
                        <div className="user-name">肥兔</div>
                    </div>
                    <div className="bottom-dropdown-button">
                        <img src={MoreIcon} alt="" />
                    </div>
                </div>
            </div>
            <div className="main-content">
                <Space size="middle" className="transfer-btns">
                    <Button size="small"><UploadOutlined />上传文件</Button>
                    <Button size="small">下载</Button>
                    <Button size="small">删除</Button>
                </Space>
                <div className="control-btns">
                    <Space size="middle" align="center" className="left-wrapper">
                        <Button size="small">
                            <img
                                className='back'
                                src={BackIcon}
                                alt=""
                            />
                        </Button>
                        <Button size="small">
                            <img
                                className="reload"
                                role="presentation"
                                src={ReloadIcon}
                                alt=""
                            />
                        </Button>

                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                        </Breadcrumb>
                    </Space>
                    <Space size="middle" align="center" className="right-wrapper">
                        <Input
                            size="small"
                            prefix={<img src={SearchIcon} alt="" />}
                            placeholder="搜索"
                        />
                        <Button size="small">
                            <img
                                role="presentation"
                                className="mode-icon"
                                src={TableIcon}
                                alt=""
                            />
                        </Button>
                    </Space>
                </div>
                <div className="file-wrapper">
                    <Table
                        rowKey="shortId"
                        size="small"
                        dataSource={items}
                        childrenColumnName="never"
                        showSorterTooltip={false}
                        scroll={{ y: 800 }}
                        columns={columns}
                        pagination={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default MainPage