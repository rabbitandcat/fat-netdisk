import React from 'react'
import { Button, Space, Input, Breadcrumb, Table } from "antd";
import { Item } from "../../../lib/vdir/types";
import Icon from "../../../components/IconFont";
import VFolder from "../../../lib/vdir/VFolder";
import VFile from "../../../lib/vdir/VFile";
import shortid from 'shortid';


type PropTypes = {
    items: Item[],
}

const BodyTable: React.FC<PropTypes> = params => {

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
        <div className="file-wrapper-table">
            <Table
                rowKey="shortId"
                size="small"
                dataSource={params.items}
                childrenColumnName="never"
                showSorterTooltip={false}
                scroll={{ y: 800 }}
                columns={columns}
                pagination={false}
            />
        </div>
    )
}

export default BodyTable