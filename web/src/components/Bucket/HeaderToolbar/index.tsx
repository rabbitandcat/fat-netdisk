import React from 'react'
import { Button, Space, Input, Breadcrumb, Table } from "antd";

import { Layout } from '../../../lib/enums';
import BackIcon from "../../../assets/images/back.png";
import ReloadIcon from "../../../assets/images/reload.png";
import SearchIcon from "../../../assets/images/search.png";
import GridIcon from "../../../assets/images/grid.png";
import TableIcon from "../../../assets/images/table.png";
import VFolder from '../../../lib/vdir/VFolder';


type PropTypes = {
    layout: Layout,
    onChangeLayout: () => void,
    onRefresh: () => void,
    navigators: string[],
    backspace: () => void;
    jumpTo: (path: string) => void;
    onSearchChange: (value: string) => void;
}

const HeaderTollbar: React.FC<PropTypes> = params => {
    return (
        <div className="control-btns">
            <Space size="middle" align="center" className="left-wrapper">
                <Button size="small" onClick={params.backspace}

                >
                    <img
                        className='back'
                        src={BackIcon}
                        alt=""
                    />
                </Button>
                <Button size="small"
                    onClick={params.onRefresh}
                >
                    <img
                        className="reload"
                        role="presentation"
                        src={ReloadIcon}
                        alt=""
                    />
                </Button>

                <Breadcrumb>
                    {["首页"].concat(params.navigators).map(item => (
                        <Breadcrumb.Item onClick={() => params.jumpTo(item)} key={item}>{item}</Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </Space>
            <Space size="middle" align="center" className="right-wrapper">
                <Input
                    size="small"
                    prefix={<img src={SearchIcon} alt="" />}
                    placeholder="搜索"
                    onChange={event => params.onSearchChange(event.target.value)}
                />
                {params.layout === Layout.table ? (
                    <Button size="small" onClick={params.onChangeLayout}
                    >
                        <img
                            role="presentation"
                            className="mode-icon"
                            src={TableIcon}
                            alt=""
                        />
                    </Button>
                ) : (
                    <Button size="small" onClick={params.onChangeLayout}>
                        <img
                            role="presentation"
                            className="mode-icon"
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