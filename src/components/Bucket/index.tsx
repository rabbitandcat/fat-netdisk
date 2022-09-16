import React from 'react'
import './index.scss'
import HeaderButtonGroup from './HeaderButtonGroup'
import HeaderToolbar from './HeaderToolbar'
import BodyTable from './BodyTable'


const Bucket: React.FC = () => {
    return (
        <div className="main-content">
            <HeaderButtonGroup></HeaderButtonGroup>
            <HeaderToolbar></HeaderToolbar>
            <BodyTable></BodyTable>
        </div>
    )
}

export default Bucket