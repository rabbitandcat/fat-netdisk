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
    const [items, setItems] = useState<Item[]>([
        {
            name: '学习视频1',
            webkitRelativePath: '/path',
            meta: 'meta1',
            type: 'file',
            size: 0,
            lastModified: 0,
            lastModifiedDate: new Date(),
            shortId: shortid()
        },
        {
            name: '学习视频2',
            webkitRelativePath: '/path',
            meta: 'meta2',
            type: 'file',
            size: 1,
            lastModified: 0,
            lastModifiedDate: new Date(),
            shortId: shortid()
        },
        {
            name: '学习视频3',
            webkitRelativePath: '/path',
            meta: 'meta2',
            type: 'file',
            size: 1,
            lastModified: 0,
            lastModifiedDate: new Date(),
            shortId: shortid()
        },
    ])
    const [layout, setLayout] = useState<Layout>(Layout.grid);

    const displayBucketFiles = (res: any) => {
        // setItems(res);
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

    const renderMainLayout = () => {
        if (items.length <= 0) {
            return <Empty title="没有文件" subTitle="当前 bucket 中没有文件" />;
        }
        return layout === Layout.grid ? (
            <BodyGrid
                items={items}
            ></BodyGrid>
        ) : (
            <BodyTable
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