import React from "react"
import shortid from "shortid";

import { Item } from "../../../lib/vdir/types";
import VFile from "../../../lib/vdir/VFile";
import VFolder from "../../../lib/vdir/VFolder";
import IconFont from "../../IconFont";

const BodyGrid: React.FC = () => {

    const items: Item[] = [
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
    ]

    const renderVFile = (item: VFile) => {
        return (
            <div
                className="file-cell-grid"
                key={item.name}
            >
                <div
                    className="file-cell-grid-inner"
                    data-row-key={item.shortId}
                    title={item.name}
                >
                    <IconFont type="icon-documents" style={{ fontSize: 45 }} />
                    <span className="name">{item.name}</span>
                </div>
            </div>
        );
    };
    const renderVFolder = (item: VFolder) => {
        return (
            <div
                className="file-cell-grid"
                key={item.name}
            >
                <div className="file-cell-grid-inner" data-row-key={item.shortId}>
                    <IconFont type="icon-wenjian" style={{ fontSize: 50 }} />
                    <span className="name">{item.name}</span>
                </div>
            </div>
        );
    };
    const renderItem = (item: Item) => {
        return item instanceof VFile ? renderVFile(item) : renderVFolder(item);
    };


    return (
        <div
            className="file-wrapper-grid"
            role="presentation"
        >
            {items.map(renderItem)}
        </div>
    );
}

export default BodyGrid