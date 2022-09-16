import React from "react"
import shortid from "shortid";

import { Item } from "../../../lib/vdir/types";
import VFile from "../../../lib/vdir/VFile";
import VFolder from "../../../lib/vdir/VFolder";
import IconFont from "../../IconFont";

type PropTypes = {
    items: Item[],
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
            {params.items.map(renderItem)}
        </div>
    );
}

export default BodyGrid