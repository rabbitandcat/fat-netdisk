import React from "react"
import shortid from "shortid";

import { Item } from "../../../lib/vdir/types";
import VFile from "../../../lib/vdir/VFile";
import VFolder from "../../../lib/vdir/VFolder";
import IconFont from "../../IconFont";

type PropTypes = {
    items: Item[],
    onFolderSelect: (name: string) => void,
}

const sorter = (a: Item, b: Item) => {
    if (a instanceof VFolder && b instanceof VFile) {
        return -1
    }
    if (a instanceof VFile && b instanceof VFolder) {
        return 1
    }
    return a.name.localeCompare(b.name)
}

const BodyGrid: React.FC<PropTypes> = params => {

    const renderVFile = (item: VFile) => {
            return (
                <div
                    className="file-cell-grid"
                    key={item.name}
                >
                    <div
                        className="file-cell-grid-inner"
                        title={item.name}
                    >
                        <IconFont type="icon-documents" style={{ fontSize: 50 }} />
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
                    onDoubleClick={() => params.onFolderSelect(item.name)}
                >
                    <div className="file-cell-grid-inner">
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
            {params.items.sort(sorter).map(renderItem)}
        </div>
    );
}

export default BodyGrid