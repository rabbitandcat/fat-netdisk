import React, { useEffect, useState, useContext } from 'react'
import './index.scss'
import '../../style/index.scss'

import { message } from "antd";

import { Page, TaskType } from '../../lib/enums';

import TheSidebar from '../../components/TheSidebar';
import Bucket from '../../components/Bucket';
import TransferList from '../../components/TransferList';
import TransferDone from '../../components/TransferDone';
import useTransfers from '../../hooks/useTransfers';
import { TransferStore } from '../../../types/common';

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


const MainPage: React.FC = () => {
    const [activePage, setActivePage] = useState<Page>(Page.bucket)
    const [transfers, setTransfers] = useState<TransferStoreWithProgress[]>([])

    const tabChange = async (page: Page) => {
        try {
            setActivePage(page)
        } catch (e: any) {
            message.error(e.message)
        }
    }


    const renderPage = (page: Page) => {
        switch (page) {
            case Page.bucket:
                return <Bucket transfers={transfers} setTransfers={setTransfers}/>;
            case Page.transferDone:
                return <TransferDone />
            case Page.transferList:
                return <TransferList transfers={transfers} />
        }
    }

    useEffect(() => {
        
    }, [transfers])

    return (
        <div className="main-page">
            <TheSidebar
                activePage={activePage}
                tabChange={tabChange}
            ></TheSidebar>
                {renderPage(activePage)}
        </div>
    )
}

export default MainPage