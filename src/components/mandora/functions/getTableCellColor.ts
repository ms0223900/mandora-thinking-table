import { SingleMandoraTableCellData } from "../MandoraThinkingTable";

const getTableCellColor = (col: number, row: number) => (color: string): Pick<SingleMandoraTableCellData, 'color' | 'txtColor'> => {
  const colMiddle = Math.floor(9/2);
  const rowMiddle = Math.floor(9/2);

  const highlightColorObj = {
    color,
    txtColor: '#111',
  }
  const normalColorObj = {
    color: '#fff',
    txtColor: '#333'
  }
  if(col === colMiddle && row === rowMiddle) return ({
    ...highlightColorObj,
    color: '#9570b8',
    txtColor: '#fff',
  });

  if(row % 3 === 1 && col % 3 === 1) return highlightColorObj;
  if((row > 2 && row < 6) && (col > 2 && col < 6)) return highlightColorObj;
  return normalColorObj 
}

export default getTableCellColor;
