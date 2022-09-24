import { useEffect, useState } from "react";
import { TransferStore } from '../../types/common';
import { TaskType } from '../lib/enums';

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

const useTransfers = () => {
  const [transfers, setTransfers] = useState<TransferStoreWithProgress[]>([]);


  return { transfers, setTransfers };
};

export default useTransfers;