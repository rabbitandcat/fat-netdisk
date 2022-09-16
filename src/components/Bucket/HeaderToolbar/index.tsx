import React from 'react'
import { Button, Space, Input, Breadcrumb, Table } from "antd";

import { Layout } from '../../../lib/enums';
import BackIcon from "../../../assets/images/back.png";
import ReloadIcon from "../../../assets/images/reload.png";
import SearchIcon from "../../../assets/images/search.png";
import GridIcon from "../../../assets/images/grid.png";
import TableIcon from "../../../assets/images/table.png";


type PropTypes = {
    layout: Layout,
    setLayout: (layout: Layout) => void
}

const HeaderTollbar: React.FC<PropTypes> = params => {
    return (
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
                    <Breadcrumb.Item>我的资源</Breadcrumb.Item>
                    <Breadcrumb.Item>学习资料</Breadcrumb.Item>
                </Breadcrumb>
            </Space>
            <Space size="middle" align="center" className="right-wrapper">
                <Input
                    size="small"
                    prefix={<img src={SearchIcon} alt="" />}
                    placeholder="搜索"
                />
                {params.layout === Layout.table ? (
                    <Button size="small">
                        <img
                            role="presentation"
                            className="mode-icon"
                            onClick={() => {if(params.layout === Layout.table) params.setLayout(Layout.grid)}}
                            src={TableIcon}
                            alt=""
                        />
                    </Button>
                ) : (
                    <Button size="small">
                        <img
                            role="presentation"
                            className="mode-icon"
                            onClick={() => {if(params.layout === Layout.grid) params.setLayout(Layout.table)}}
                            src={GridIcon}
                            alt=""
                        />
                    </Button>
                )}
            </Space>
        </div>
    )
}

export default HeaderTollbar