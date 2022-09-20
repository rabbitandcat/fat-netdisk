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
import VFile from '../../lib/vdir/VFile'


const Bucket: React.FC = () => {
    const [vFolder, setVFolder] = useState<VFolder>(new VFolder("Root"));
    const [items, setItems] = useState<Item[]>([])
    const [layout, setLayout] = useState<Layout>(Layout.grid);

    const levelOrder = (root: VFolder) => {
        // 层序遍历，得到所有文件夹
        let res: any[] = []
        let q: any[] = [root]
        if (!root) return res
        while (q.length) {
            let len = q.length
            let curLevel = []
            for (let i = 0; i < len; i++) {
                let node = q.shift()
                curLevel.push(node)
                for(let j = 0; j < node.children.length; j++) {
                    if(node.children[j] instanceof VFolder) {
                        q.push(node.children[j])
                    }
                }
            }
            res.push(curLevel)
        }
        return res
    }
    // 倒序层序遍历，得到所有文件夹的大小
    const reverseLevelOrder = (res: any) => {
        let depth = res.length - 1
        for(let i = depth; i >= 0; i--) {
            res[i].forEach((folder: VFolder) => {
                folder.size = 0
                folder.lastModifiedDate = folder.children[0].lastModifiedDate
                folder.children.forEach((child: VFolder | VFile) => {
                    folder.size += child.size
                    if(Date.parse(child.lastModifiedDate) > Date.parse(folder.lastModifiedDate)) {
                        folder.lastModifiedDate = child.lastModifiedDate
                    }
                })
            })
        }
        return res
    }

    const displayBucketFiles = (res: any) => {
        const vf = VFolder.from(res.data)
        setVFolder(vf);
        reverseLevelOrder(levelOrder(vf))
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