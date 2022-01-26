import { SingleMandoraTableCellData } from "../MandoraThinkingTable";
import { ColorsConfig } from "../types";

const getTableCellColor = (col: number, row: number) => ({
  bgColor, txtColor
}: ColorsConfig): Pick<SingleMandoraTableCellData, 'color' | 'txtColor'> => {
  const colMiddle = Math.floor(9/2);
  const rowMiddle = Math.floor(9/2);

  const highlightColorObj = {
    color: bgColor.secondary,
    txtColor: txtColor.secondary,
  }
  const normalColorObj = {
    color: '#fff',
    txtColor: '#333'
  }
  if(col === colMiddle && row === rowMiddle) return ({
    ...highlightColorObj,
    color: bgColor.main,
    txtColor: txtColor.main,
  });

  if(row % 3 === 1 && col % 3 === 1) return highlightColorObj;
  if((row > 2 && row < 6) && (col > 2 && col < 6)) return highlightColorObj;
  return normalColorObj 
}

export const wrapListDataWithColor = (listData: SingleMandoraTableCellData[][]) => (colorsConfig: ColorsConfig) => listData.map((_, i) => _.map((item, j) => (
  {
    ...item,
    ...getTableCellColor(i, j)(colorsConfig),
  }
)))

export default getTableCellColor;
