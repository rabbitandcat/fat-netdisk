import React from 'react'
import './index.scss'

import FileIcon from "../../assets/images/file.png";
import DownloadIcon from "../../assets/images/download.png";
import DoneIcon from "../../assets/images/done.png";
import UserIcon from '../../assets/svg/user-line.svg'
import MoreIcon from '../../assets/svg/more-fill.svg'


const TheSidebar: React.FC = () => {
    return (
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
    )
}

export default TheSidebar