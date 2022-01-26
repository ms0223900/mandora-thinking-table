import { SingleMandoraTableCellData } from "../MandoraThinkingTable";
import getTableCellColor from "./getTableCellColor";

const TableDataLSHandlers = (() => {

  const LSKey = 'MANDORA_TABLE_LIST_DATA';

  const makeInitTableListData = () => Array(9).fill(0).map((l, i) => Array(9).fill(0).map((_, j) => ({
    ...getTableCellColor(i, j)({
      bgColor: {
        main: '#9570b8', 
        secondary: '#d6c8e3'
      },
      txtColor: {
        main: '#fff',
        secondary: '#333',
      }
    }),
    content: ''
  })));

  const handleGetTableListDataFromLS = (): SingleMandoraTableCellData[][] => {
    console.log('get')
    if(typeof window === 'undefined') return[];
    const initListData = makeInitTableListData();
    const data = localStorage.getItem(LSKey)
    if(!data) return initListData;

    const parsed = JSON.parse(data)
    if(!parsed || !parsed.length) return initListData
    return parsed
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
