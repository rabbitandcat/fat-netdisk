import React, { useState } from 'react'
import './index.scss'
import { TransferStore } from '../../../types/common';
import Icon from "../IconFont";
import { Progress, Button } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import Empty from '../Bucket/Empty';
import { TaskType } from '../../lib/enums';


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

const TransferDone: React.FC = () => {
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

    const onClearTransferDoneList = async () => {
        setTransfers([]);
    };

    return (
        <div className="transfer-done-wrapper">
            {transfers.length > 0 ? (
                <>
                    <div className="toolbar">
                        <span className="toolbar-left">{`总共 ${transfers.length} 项`}</span>
                        <div className="toolbar-right">
                            <Button size="small" onClick={onClearTransferDoneList}>
                                清空记录
                            </Button>
                        </div>
                    </div>
                    <section className="transfer-table__wrapper">
                        <table className="transfer-table">
                            <tbody>
                                {transfers.map((item: TransferStore) => (
                                    <tr className="transfer-table__row" key={item.id + item.name}>
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
                                        <td>下载</td>
                                        <td>YYYY年MM月DD日 HH:mm:ss</td>
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

export default TransferDone