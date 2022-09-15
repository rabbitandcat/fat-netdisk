import React, { useEffect, useState } from 'react'
import './index.scss'
import '../../style/index.scss'
import FileIcon from "../../assets/images/file.png";
import DownloadIcon from "../../assets/images/download.png";
import DoneIcon from "../../assets/images/done.png";
import UserIcon from '../../assets/svg/user-line.svg'
import MoreIcon from '../../assets/svg/more-fill.svg'

import { Button, Space, Input, Breadcrumb } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import BackIcon from "../../assets/images/back.png";
import ReloadIcon from "../../assets/images/reload.png";
import SearchIcon from "../../assets/images/search.png";
import GridIcon from "../../assets/images/grid.png";
import TableIcon from "../../assets/images/table.png";


const MainPage: React.FC = () => {
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
                                src={GridIcon}
                                alt=""
                            />
                        </Button>
                    </Space>
                </div>
                <div className="file-wrapper">
                    文件区域
                </div>
            </div>
        </div>
    )
}

export default MainPage