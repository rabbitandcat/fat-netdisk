import React, { useEffect, useState } from 'react'
import './index.scss'
import HeaderButtonGroup from './HeaderButtonGroup'
import HeaderToolbar from './HeaderToolbar'
import BodyTable from './BodyTable'
import BodyGrid from './BodyGrid'
import { KeyCode, Layout } from '../../lib/enums'
import { Item } from '../../lib/vdir/types'
import shortid from 'shortid'
import Empty from './Empty'

import { getBucketFileList, uploadFileList } from '../../api/bucket'
import VFolder from '../../lib/vdir/VFolder'
import VFile from '../../lib/vdir/VFile'
import { message, Spin } from 'antd'
import useSelection from '../../hooks/useSelection'
import useKeyPress from '../../hooks/useKeyPress'


const Bucket: React.FC = () => {
    const [vFolder, setVFolder] = useState<VFolder>(new VFolder("Root"));
    const [items, setItems] = useState<Item[]>([])
    const [layout, setLayout] = useState<Layout>(Layout.grid);
    const [loading, setLoading] = useState<boolean>(false);
    const keypress = useKeyPress(KeyCode.Escape);
    const selection = useSelection(items)


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
                for (let j = 0; j < node.children.length; j++) {
                    if (node.children[j] instanceof VFolder) {
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
        for (let i = depth; i >= 0; i--) {
            res[i].forEach((folder: VFolder) => {
                folder.size = 0
                folder.lastModifiedDate = folder.children[0].lastModifiedDate
                folder.children.forEach((child: VFolder | VFile) => {
                    folder.size += child.size
                    if (Date.parse(child.lastModifiedDate) > Date.parse(folder.lastModifiedDate)) {
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
        setLoading(true);
        console.log('onRefresh');
        const res = await getBucketFileList()
        displayBucketFiles(res)
        setLoading(false);
    }

    const _getFiles = (itemArr: any[]) => {
        let files: VFile[] = [];
        itemArr.forEach(item => {
          if (item instanceof VFile) {
            files.push(item);
          } else {
            files = [...files, ..._getFiles([...item.getItems()])];
          }
        });
        return files
    }

    const getOperationFiles = (opItem?: Item) => {
        // 开始获取选中文件数量
        let files: VFile[] = [];
        if (selection.fileNames.length > 0) {
          // 如果选中区域有文件的话，那么下载选中区域的文件
          const itemsArr: Item[] = [];
          selection.fileNames.forEach(fileId => {
            const item = vFolder.getItem(fileId);
            if (item) itemsArr.push(item);
          });
          files = _getFiles(itemsArr);
        }
    
        if (files.length <= 0 && opItem) {
          // 如果选中区域没有文件，那么直接下载当前上下文中的区域
          files = _getFiles([opItem]);
        }
    
        return files;
      };


    const onChangeLayout = async () => {
        const nextLayout = layout === Layout.grid ? Layout.table : Layout.grid;
        setLayout(nextLayout);
    };

    const onFolderSelect = (name: string) => {
        vFolder.changeDir(name);
        setItems(vFolder.listFiles());
    }

    const backspace = () => {
        vFolder.back();
        setItems(vFolder.listFiles());
    };


    const jumpTo = (path: string) => {
        vFolder.jumpTo(path);
        setItems(vFolder.listFiles());
    }

    const renderMainLayout = () => {
        if (items.length <= 0) {
            return <Empty title="没有文件" subTitle="当前 bucket 中没有文件" />;
        }
        return layout === Layout.table ? (
            <BodyGrid
                items={items}
                onFolderSelect={onFolderSelect}
            ></BodyGrid>
        ) : (
            <BodyTable
                selection={selection}
                onFolderSelect={onFolderSelect}
                items={items}
                vFolder={vFolder}
            ></BodyTable>
        )
    }



    useEffect(() => {
        if (keypress) selection.clear();
      }, [keypress]);
    

    useEffect(() => {
        onRefresh()
    }, []);

    return (
        <div className="main-content">
            <HeaderButtonGroup
                vFolder={vFolder}
            ></HeaderButtonGroup>
            <HeaderToolbar
                onRefresh={onRefresh}
                layout={layout}
                onChangeLayout={onChangeLayout}
                navigators={vFolder.getNav()}
                backspace={backspace}
                jumpTo={jumpTo}
            ></HeaderToolbar>
            <Spin spinning={loading} wrapperClassName="loading-wrapper">
                {renderMainLayout()}
            </Spin>
        </div>
    )
}

export default Bucket