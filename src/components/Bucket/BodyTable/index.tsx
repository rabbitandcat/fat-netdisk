import React from 'react'
import { Button, Space, Input, Breadcrumb, Table } from "antd";
import { Item } from "../../../lib/vdir/types";
import Icon from "../../../components/IconFont";
import VFolder from "../../../lib/vdir/VFolder";
import VFile from "../../../lib/vdir/VFile";
import shortid from 'shortid';


const BodyTable: React.FC = () => {

    const items: Item[] = [
        {
            name: '学习视频1',
            webkitRelativePath: '/path',
            meta: 'meta1',
            type: 'file',
            size: 0,
            lastModified: 0,
            lastModifiedDate: new Date(),
            shortId: shortid()
        },
        {
            name: '学习视频2',
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
    )
}

export default BodyTable