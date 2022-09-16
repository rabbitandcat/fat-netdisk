import React, { useEffect, useState } from 'react'
import './index.scss'
import '../../style/index.scss'

import TheSidebar from '../../components/TheSidebar';
import Bucket from '../../components/Bucket';


const MainPage: React.FC = () => {
    
    return (
        <div className="main-page">
            <TheSidebar></TheSidebar>
            <Bucket></Bucket>
        </div>
    )
}

export default MainPage