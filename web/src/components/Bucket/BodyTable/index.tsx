import React, { useState, useEffect } from 'react'
import { Button, Space, Input, Breadcrumb, Table } from "antd";
import { Item } from "../../../lib/vdir/types";
import Icon from "../../../components/IconFont";
import VFolder from "../../../lib/vdir/VFolder";
import VFile from "../../../lib/vdir/VFile";
import shortid from 'shortid';

const formatSize = (size: number) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = 0;
    while (size >= 1024) {
        size /= 1024;
        i++;
    }
    return size.toFixed(2) + units[i];
}


type PropTypes = {
    items: Item[],
    onFolderSelect: (name: string) => void,
    vFolder: VFolder,
    selection: any,
}

const BodyTable: React.FC<PropTypes> = params => {

    const [prefix, setPrefix] = useState<string>("");

    const columns: any = [
        {
            title: "文件名",
            dataIndex: "name",
            key: "name",
            defaultSortOrder: "ascend",
            sorter: (a: Item, b: Item) => {
                if (a instanceof VFolder && b instanceof VFile) {
                    return -1
                }
                if (a instanceof VFile && b instanceof VFolder) {
                    return 1
                }
                return a.name.localeCompare(b.name)
            },
            ellipsis: true,
            render(name: string, item: Item) {
                return (
                    <div className="file-meta">
                        <Icon
                            type={
                                item instanceof VFile
                                    ? "icon-documents"
                                    : "icon-wenjian"
                            }
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
            defaultSortOder: "default",
            sorter: (a: Item, b: Item) => a.size - b.size,
            ellipsis: true,
            render(size: number) {
                return formatSize(size);
            }
        },
        {
            title: "修改日期",
            dataIndex: "lastModifiedDate",
            key: "lastModifiedDate",
            defaultSortOder: "default",
            ellipsis: true,
            sorter: (a: Item, b: Item) => Date.parse(a.lastModifiedDate) - Date.parse(b.lastModifiedDate),
            render(lastModifiedDate: string) {
                return lastModifiedDate;
            }
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
            if (params.vFolder.navigator) {
                setPrefix(params.vFolder.navigator.join('/'))
            }
        },
    };

    useEffect(() => {
        console.log('prefix', prefix);
    }, [])

    return (
        <div className="file-wrapper-table"
            >
            <Table
                rowKey="name"
                size="small"
                dataSource={params.items}
                childrenColumnName="never"
                showSorterTooltip={false}
                rowSelection={rowSelection}
                scroll={{ y: 800 }}
                columns={columns}
                pagination={false}
                onRow={record => {
                    return {
                        onDoubleClick(event: any) {
                            if (record instanceof VFolder && event.target.tagName !== "INPUT") {
                                params.onFolderSelect(record.name);
                            }
                        },
                    };
                }}
            />
        </div>
    )
}

export default BodyTable