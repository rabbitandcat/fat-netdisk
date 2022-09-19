import React, { useState } from 'react'
import './index.scss'
import HeaderButtonGroup from './HeaderButtonGroup'
import HeaderToolbar from './HeaderToolbar'
import BodyTable from './BodyTable'
import BodyGrid from './BodyGrid'
import { Layout } from '../../lib/enums'
import { Item } from '../../lib/vdir/types'
import shortid from 'shortid'
import Empty from './Empty'

import { getBucketFileList } from '../../api/bucket'
import VFolder from '../../lib/vdir/VFolder'


const Bucket: React.FC = () => {
    const [vFolder, setVFolder] = useState<VFolder>(new VFolder("Root"));
    const [items, setItems] = useState<Item[]>([])
    const [layout, setLayout] = useState<Layout>(Layout.grid);

    const displayBucketFiles = (res: any) => {
        const vf = VFolder.from(res.data)
        setVFolder(vf);
        console.log("已经传入res.data", res.data);
        console.log("当前列表", vf.listFiles())
        setItems(vf.listFiles())
    }

    const onRefresh = async () => {
        console.log('onRefresh');
        const res = await getBucketFileList()
        displayBucketFiles(res)
    }


    const onChangeLayout = async () => {
        const nextLayout = layout === Layout.grid ? Layout.table : Layout.grid;
        setLayout(nextLayout);
    };

    const onFolderSelect = (name: string) => {
        vFolder.changeDir(name)
        setItems(vFolder.listFiles())
    }

    const renderMainLayout = () => {
        if (items.length <= 0) {
            return <Empty title="没有文件" subTitle="当前 bucket 中没有文件" />;
        }
        return layout === Layout.grid ? (
            <BodyGrid
                items={items}
                onFolderSelect={onFolderSelect}
            ></BodyGrid>
        ) : (
            <BodyTable
                onFolderSelect={onFolderSelect}
                items={items}
            ></BodyTable>
        )
    }

    return (
        <div className="main-content">
            <HeaderButtonGroup></HeaderButtonGroup>
            <HeaderToolbar
                onRefresh={onRefresh}
                layout={layout}
                onChangeLayout={onChangeLayout}
            ></HeaderToolbar>
            {renderMainLayout()}
        </div>
    )
}

export default Bucket