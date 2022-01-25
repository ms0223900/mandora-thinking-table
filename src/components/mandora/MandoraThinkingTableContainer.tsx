import { useEffect, useState } from "react";
import TableDataLSHandlers from "./functions/TableDataLSHandlers";
import MandoraThinkingTable, { SingleMandoraTableCellData } from "./MandoraThinkingTable"

// first is zero
// col-row
const COL_ROW_MAPPING_GRAPH: Record<string, string> = {
  '1-1': '3-3',
  '3-3': '1-1',

  '1-4': '3-4',
  '3-4': '1-4',

  '1-7': '3-5',
  '3-5': '1-7',

  '4-1': '4-3',
  '4-3': '4-1',

  '4-7': '4-5',
  '4-5': '4-7',

  '7-1': '5-3',
  '5-3': '7-1',

  '7-4': '5-4',
  '5-4': '7-4',

  '7-7': '5-5',
  '5-5': '7-7',
}
const getMappedColRow = (col: number, row: number) => {
  const mappedColRow = COL_ROW_MAPPING_GRAPH[`${col}-${row}`];
  if(mappedColRow) {
    const [col, row] = mappedColRow.split('-').map(s => Number(s));
    return ({
      col, row
    })
  }
  return undefined;
}

const useMandoraThinkingTable = () => {
  const [listData, setListData] = useState<SingleMandoraTableCellData[][]>([])

  const handleEditTableCell = (col: number, row: number) => (e: any) => {
    setListData(l => {
      const newL = [...l];
      const mappedColRow = getMappedColRow(col, row)
      if(mappedColRow) {
        newL[mappedColRow.row][mappedColRow.col].content = e.target.value;
      }
      newL[row][col].content = e.target.value;
      return newL;
    })
  }

  // localstorage一定要在mount之後才能使用
  useEffect(() => {
    setListData(
      TableDataLSHandlers.handleGetTableListDataFromLS(),
    )
  }, [])

  useEffect(() => {
    TableDataLSHandlers.handleSetTableListDataToLS(listData)
  }, [listData])

  return ({
    listData,
    handleEditTableCell,
  })
}

const MandoraThinkingTableContainer = () => {
  const {
    listData,
    handleEditTableCell,
  } = useMandoraThinkingTable()
  return (
    <MandoraThinkingTable 
      listData={listData}
      onEditCellTableItem={handleEditTableCell}
    />
  )
}

export default MandoraThinkingTableContainer;
