import React, { useEffect, useState } from 'react'
import './index.scss'
import '../../style/index.scss'

import { message } from "antd";

import { Page } from '../../lib/enums';

import TheSidebar from '../../components/TheSidebar';
import Bucket from '../../components/Bucket';
import TransferList from '../../components/TransferList';
import TransferDone from '../../components/TransferDone';


const MainPage: React.FC = () => {
    const  [activePage, setActivePage] = useState<Page>(Page.bucket)

    const tabChange = async (page: Page) => {
        try {
            setActivePage(page)
        } catch(e: any) {
            message.error(e.message)
        }
    }


    const renderPage = (page: Page) => {
        switch (page) {
            case Page.bucket:
                return <Bucket />;
            case Page.transferDone:
                return <TransferDone />
            case Page.transferList:
                return <TransferList />
        }
    }

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