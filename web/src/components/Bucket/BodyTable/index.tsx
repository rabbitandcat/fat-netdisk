import React from 'react'
import { Button, Space, Input, Breadcrumb, Table } from "antd";
import { Item } from "../../../lib/vdir/types";
import Icon from "../../../components/IconFont";
import VFolder from "../../../lib/vdir/VFolder";
import VFile from "../../../lib/vdir/VFile";
import shortid from 'shortid';


type PropTypes = {
    items: Item[],
    onFolderSelect: (name: string) => void,
}

const BodyTable: React.FC<PropTypes> = params => {

    const columns = [
        {
            title: "文件名",
            dataIndex: "name",
            key: "name",
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
            sorter: (a: Item, b: Item) => a.size - b.size,
            ellipsis: true,
            render(size: number) {
                return size;
            }
        },
        {
            title: "修改日期",
            dataIndex: "lastModifiedDate",
            key: "lastModifiedDate",
            ellipsis: true,
            render(lastModifiedDate: string) {
                return lastModifiedDate;
            }
        }
    ];

    return (
        <div className="file-wrapper-table">
            <Table
                rowKey="name"
                size="small"
                dataSource={params.items}
                childrenColumnName="never"
                showSorterTooltip={false}
                scroll={{ y: 800 }}
                columns={columns}
                pagination={false}
                onRow={record => {
                    return {
                      onDoubleClick(event) {
                        if (record instanceof VFolder) {
                          params.onFolderSelect(record.name);
                        }
                      },
                    //   onContextMenu(event) {
                    //     if (record instanceof VFile) {
                    //       params.onFileContextMenu(event, record);
                    //     }
                    //   }
                    };
                  }}
            />
        </div>
    )
}

export default BodyTable