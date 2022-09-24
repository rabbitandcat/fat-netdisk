import React, { useState } from 'react'
import './index.scss'
import { TransferStore } from '../../../types/common';
import Icon from "../IconFont";
import { Progress } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import Empty from '../Bucket/Empty';
import { TaskType } from '../../lib/enums';
import useTransfers from '../../hooks/useTransfers';



type ProgressListType = {
    id: string;
    progress: number;
}
interface TransferStoreWithProgress extends TransferStore {
    progress: number
}

enum TransferStatus {
    default,
    done,
    failed
}

const TransferList: React.FC = () => {
    const [transfers, setTransfers] = useState<TransferStoreWithProgress[]>([
        {
            id: '1',
            name: 'name1',
            size: 0,
            date: 0,
            type: TaskType.download,
            status: TransferStatus.default,
            progress: 23
        },
        {
            id: '2',
            name: 'name2',
            size: 0,
            date: 0,
            type: TaskType.download,
            status: TransferStatus.default,
            progress: 100
        }
    ]);

    return (
        <div className="transfer-list-wrapper">
            {transfers.length > 0 ? (
                <>
                    <div className="toolbar">
                        <span className="toolbar-left">{`总共 ${transfers.length} 项`}</span>
                        <div className="toolbar-right" />
                    </div>
                    <section className="transfer-table__wrapper">
                        <table className="transfer-table">
                            <tbody>
                                {transfers.map((item: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; progress: number | undefined; }) => (
                                    <tr className="transfer-table__row" key={item.id}>
                                        <td className="transfer-table__row_item meta">
                                            <Icon
                                                className="icon"
                                                type="icon-documents"
                                                style={{ fontSize: 30 }}
                                            />
                                            <div className="name-wrapper">
                                                <div className="name">{item.name}</div>
                                                <div className="size">
                                                    YYYY年MM月DD日 HH:mm:ss
                                                </div>
                                            </div>
                                        </td>
                                        <td className="transfer-table__row_item progress">
                                            <Progress percent={item.progress} />
                                        </td>
                                        <td className="transfer-table__row_item type">
                                            <DownloadOutlined />
                                        </td>
                                        <td className="transfer-table__row_item action">action</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </>
            ) : (
                <Empty title="没有文件" subTitle="没有找到传输列表" />
            )}
        </div>

    )
}

export default TransferList