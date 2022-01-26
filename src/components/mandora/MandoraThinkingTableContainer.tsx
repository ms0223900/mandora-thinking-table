import { useEffect, useRef, useState } from "react";
import { SELECTOR_DEFAULT_VALUE, SELECTOR_PERSONAL_VALUE } from "../../../configs";
import SAMPLE_MANDORA_LIST_DATA from "../../../static/mandora.sample";
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

export interface MandoraThinkingTableState {
  isEditable?: boolean
  listData: SingleMandoraTableCellData[][]
  meta?: any
}

const useMandoraThinkingTable = () => {
  const [selectedSample, setSelect] = useState<string>(SELECTOR_DEFAULT_VALUE);
  const personalTableListData = useRef<MandoraThinkingTableState['listData']>([]);

  const [state, setState] = useState<MandoraThinkingTableState>({
    listData: []
  })

  const handleEditTableCell = (col: number, row: number) => (e: any) => {
    setState(l => {
      if(!l.isEditable) return l;
      
      const newL = [...l.listData];
      const mappedColRow = getMappedColRow(col, row)
      if(mappedColRow) {
        newL[mappedColRow.row][mappedColRow.col].content = e.target.value;
      }
      newL[row][col].content = e.target.value;
      return ({
        ...l,
        listData: newL,
      });
    })
  }

  const handleSelectSampleTable = (e: any) => {
    const val = e.target.value;
    setSelect(val);
    const matched = SAMPLE_MANDORA_LIST_DATA.find(l => l.value === val);
    if(!matched) return;
    const listData = (val === SELECTOR_PERSONAL_VALUE) ? personalTableListData.current : matched.listData;

    setState({
      ...matched,
      listData,
    })
  }

  // localstorage一定要在mount之後才能使用
  useEffect(() => {
    const listDataFromLS = TableDataLSHandlers.handleGetTableListDataFromLS()
    setState({
      isEditable: false,
      listData: listDataFromLS,
    })
    personalTableListData.current = listDataFromLS
  }, [])

  useEffect(() => {
    // if(!state.isEditable) return;
    TableDataLSHandlers.handleSetTableListDataToLS(state.listData)
  }, [JSON.stringify(state)])

  return ({
    selectedSample,
    state,
    handleEditTableCell,
    handleSelectSampleTable,
  })
}

const MandoraThinkingTableContainer = () => {
  const {
    selectedSample,
    state,
    handleEditTableCell,
    handleSelectSampleTable,
  } = useMandoraThinkingTable()
  
  return (
    <div>
      <div className="pb-2 m-auto flex justify-center">
        <select className="block border-solid border-sky-600 border-2 rounded-full text-center" onChange={handleSelectSampleTable} value={selectedSample}>
          {SAMPLE_MANDORA_LIST_DATA.map(item => (
            <option disabled={item.disabled} key={item.value} value={item.value}>
              {item.text}
            </option>
          ))}
        </select>
      </div>
      <MandoraThinkingTable 
        listData={state.listData}
        onEditCellTableItem={handleEditTableCell}
      />
    </div>
  )
}

export default MandoraThinkingTableContainer;
