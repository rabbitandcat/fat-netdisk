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
};

export default useSelection;
