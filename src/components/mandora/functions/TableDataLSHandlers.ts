import { SingleMandoraTableCellData } from "../MandoraThinkingTable";
import getTableCellColor from "./getTableCellColor";

const TableDataLSHandlers = (() => {

  const LSKey = 'MANDORA_TABLE_LIST_DATA';

  const makeInitTableListData = () => Array(9).fill(0).map((l, i) => Array(9).fill(0).map((_, j) => ({
    ...getTableCellColor(i, j)('#d6c8e3'),
    content: ''
  })));

  const handleGetTableListDataFromLS = (): SingleMandoraTableCellData[][] => {
    console.log('get')
    if(typeof window === 'undefined') return[];
    const data = localStorage.getItem(LSKey)
    if(!data) return makeInitTableListData();
    return JSON.parse(data)
  }

  const handleSetTableListDataToLS = (listData: SingleMandoraTableCellData[][]) => {
    if(typeof window === 'undefined') return
    localStorage.setItem(LSKey, JSON.stringify(listData))
  }

  return ({
    handleGetTableListDataFromLS,
    handleSetTableListDataToLS,
  })
})()

export default TableDataLSHandlers;
