import React, { useState } from 'react'
import './index.scss'
import HeaderButtonGroup from './HeaderButtonGroup'
import HeaderToolbar from './HeaderToolbar'
import BodyTable from './BodyTable'
import { Layout } from '../../lib/enums'


const Bucket: React.FC = () => {
    const [layout, setLayout] = useState<Layout>(Layout.grid);

    return (
        <div className="main-content">
            <HeaderButtonGroup></HeaderButtonGroup>
            <HeaderToolbar
            layout={layout}
            setLayout={setLayout}
            ></HeaderToolbar>
            <BodyTable></BodyTable>
        </div>
    )
}

export default Bucket