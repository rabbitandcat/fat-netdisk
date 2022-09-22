import { useEffect, useState } from "react";
import Selection, { SelectionEvent } from "@simonwep/selection-js";
import { Item } from "../lib/vdir/types";

const selection = Selection.create({
  class: "selection",
  selectables: [".file-cell-grid-inner", ".ant-table-row"],
  boundaries: [".file-wrapper-table"],
  startThreshold: 10,
  disableTouch: true,
  singleClick: true
});

const useSelection = (items: Item[]) => {
  const [fileNames, setFileNames] = useState<string[]>([]);

  const clear = () => {
    setFileNames([]);
    selection.getSelection().forEach(el => el.classList.remove("selected"));
    selection.clearSelection();
  };
  const selectAll = () => {
    setFileNames(items.map(v => v.name));
    selection.select([".ant-table-row", ".file-cell-grid-inner"]);
    selection.keepSelection();
    selection.getSelection().map(el => el.classList.add("selected"));
  };

  const selectionStart = () => {
    console.log('selectionStart');
    
  };
  const selectionMove = ({
    changed: { removed, added },
    oe
  }: SelectionEvent) => {
    console.log('selectionMove');
    if ((oe as any).button !== 2) {
      added.forEach(el => {
        const rowKey = el.getAttribute("data-row-key") || "";
        setFileNames(f => f.concat(rowKey));
        el.classList.add("selected");
      });
      removed.forEach(el => {
        const rowKey = el.getAttribute("data-row-key") || "";
        setFileNames(f => {
          const index = f.findIndex(i => i === rowKey);
          f.splice(index, 1);
          return f.slice(0);
        });
        el.classList.remove("selected");
      });
    }
  };
  const selectionStop = () => {
    selection.keepSelection();
    console.log('selectionStop');
    
  };

  useEffect(() => {
    selection.on("start", selectionStart);
    selection.on("move", selectionMove);
    selection.on("stop", selectionStop);

    return () => {
      selection.off("start", selectionStart);
      selection.off("move", selectionMove);
      selection.off("stop", selectionStop);
    };
  }, []);
  return { fileNames, selectAll, clear };
};

export default useSelection;