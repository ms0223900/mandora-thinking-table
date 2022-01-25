import styles from './mandora.module.scss';



export interface SingleMandoraTableCellData {
  color?: string
  txtColor?: string
  content: string
}

export interface MandoraThinkingTableProps {
  listData: SingleMandoraTableCellData[][]
  onEditCellTableItem: (col: number, row: number) => (e: any) => any
}

const MandoraThinkingTable = ({
  listData,
  onEditCellTableItem,
}: MandoraThinkingTableProps) => {
  return (
    <table className={styles.mandora}>
      <tbody>
        {listData.map((l, i) => (
          <tr key={i}>
            {l.map((tcell, j) => (
              <td 
                key={`${i}-${j}`} 
                style={{
                  backgroundColor: tcell.color,
                  color: tcell.txtColor,
                }}
              // contentEditable={true}
              // // onInput={onEditCellTableItem(i, j)}
              >
                <textarea 
                  value={tcell.content}
                  onInput={onEditCellTableItem(j, i)}
                  style={{
                    color: tcell.txtColor,
                  }}
                />
                {/* {tcell.content} */}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MandoraThinkingTable;
