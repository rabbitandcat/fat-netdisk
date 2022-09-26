import React, { useEffect, useState } from 'react'
import './index.scss'
import HeaderButtonGroup from './HeaderButtonGroup'
import HeaderToolbar from './HeaderToolbar'
import BodyTable from './BodyTable'
import BodyGrid from './BodyGrid'
import { KeyCode, Layout, TaskType } from '../../lib/enums'
import { Item } from '../../lib/vdir/types'
import shortid from 'shortid'
import Empty from './Empty'

import { deleteFileList, downloadFileList, downloadSingleFile, getBucketFileList, uploadFileList } from '../../api/bucket'
import VFolder from '../../lib/vdir/VFolder'
import VFile from '../../lib/vdir/VFile'
import { message, Spin } from 'antd'
import useSelection from '../../hooks/useSelection'
import useKeyPress from '../../hooks/useKeyPress'
import { TransferStore } from '../../../types/common'
import FileViewer from './FileViewer/FileViewer'

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

type PropsType = {
    transfers: TransferStoreWithProgress[]
    setTransfers: (transfers: TransferStoreWithProgress[]) => void
}



const Bucket: React.FC<PropsType> = (params) => {
    const [vFolder, setVFolder] = useState<VFolder>(new VFolder("Root"));
    const [items, setItems] = useState<Item[]>([])
    const [layout, setLayout] = useState<Layout>(Layout.grid);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchedItem, setSearchedItem] = useState<Item[]>([]);
    const [viewerVisible, setViewerVisible] = useState<boolean>(false);
    const [openType, setOpenType] = useState<string>("");


    const keypress = useKeyPress(KeyCode.Escape);
    const selection = useSelection(items)

    let setTransfersList = params.setTransfers

    let transfersList = params.transfers


    const search = (root: VFolder, value: string) => {
        let result: Item[] = [];
        root.children.forEach(item => {
            if (item instanceof VFolder) {
                result = result.concat(search(item, value))
            } else {
                if (item.name.includes(value)) {
                    result.push(item)
                }
            }
        })
        return result;
    }


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
        selection.clear()
        const vf = VFolder.from(res.data)
        setVFolder(vf);
        reverseLevelOrder(levelOrder(vf))
        setItems(vf.listFiles())
    }

    const onRefresh = async () => {
        selection.clear()
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
        selection.clear()
        const nextLayout = layout === Layout.grid ? Layout.table : Layout.grid;
        setLayout(nextLayout);
    };

    const onFolderSelect = (name: string) => {
        selection.clear()
        vFolder.changeDir(name);
        setItems(vFolder.listFiles());
    }

    const onFileSelect = (item: any) => {
        console.log('onFileSelect');
        selection.clear()
        setViewerVisible(true);
        setOpenType(item.type)
      
    }

    const onSearchChange = (value: string) => {
        selection.clear();
        setSearchValue(value);        
        let res = search(vFolder, value)
        setSearchedItem(res)
        
    };

    const handleDownload = async () => {
        let fileNameList = selection.fileNames
        let prefix = vFolder.navigator.join('/')
        try {
            const res: any = await downloadFileList(fileNameList, prefix)
            const urlList = res.urlList

            urlList.forEach(async (myURL: string, index: number) => {
                transfersList.push({
                    id: index,
                    name: fileNameList[index],
                    size: 0,
                    date: 0,
                    type: TaskType.download,
                    status: TransferStatus.default,
                    progress: 100
                })
                let res: any = await downloadSingleFile(myURL, index, setTransfersList, transfersList)

                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = URL.createObjectURL(new Blob([res.data]));
                // 保存下来的文件名
                a.download = fileNameList[index];
                document.body.appendChild(a);
                a.click();
                // 移除元素
                document.body.removeChild(a);

            })
        } catch (error) {
            console.log(error);
            message.error("下载失败")
        }
    }

    const handleDelete = async () => {
        let fileNameList = selection.fileNames
        let prefix = vFolder.navigator.join('/')
        try {
            const res: any = await deleteFileList(fileNameList, prefix)
            console.log('res', res);
        } catch (error) {
            console.log(error);
            message.error("删除失败")
        }
    }

    const backspace = () => {
        selection.clear()
        vFolder.back();
        setItems(vFolder.listFiles());
    };


    const jumpTo = (path: string) => {
        selection.clear()
        vFolder.jumpTo(path);
        setItems(vFolder.listFiles());
    }

    const renderMainLayout = () => {
        if (items.length <= 0) {
            return <Empty title="没有文件" subTitle="当前 bucket 中没有文件" />;
        }
        return layout === Layout.table ? (
            <BodyGrid
                items={searchValue ? searchedItem : items}
                onFolderSelect={onFolderSelect}
                selection={selection}
                vFolder={vFolder}
            ></BodyGrid>
        ) : (
            <BodyTable
                items={searchValue ? searchedItem : items}
                selection={selection}
                onFolderSelect={onFolderSelect}
                onFileSelect={onFileSelect}
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
                selection={selection}
                handleDownload={handleDownload}
                handleDelete={handleDelete}
            ></HeaderButtonGroup>
            <HeaderToolbar
                onRefresh={onRefresh}
                layout={layout}
                onChangeLayout={onChangeLayout}
                navigators={vFolder.getNav()}
                backspace={backspace}
                jumpTo={jumpTo}
                onSearchChange={onSearchChange}
            ></HeaderToolbar>
            <Spin
                spinning={loading}
                wrapperClassName="loading-wrapper"
            >
                {renderMainLayout()}
            </Spin>
            <FileViewer
                visible={viewerVisible}
                setVisible={setViewerVisible}
                openType={openType}
            />
        </div>
    )
}

export default Bucket