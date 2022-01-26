import { SELECTOR_DEFAULT_VALUE } from "../configs";
import { wrapListDataWithColor } from "../src/components/mandora/functions/getTableCellColor";
import { SingleMandoraTableCellData } from "../src/components/mandora/MandoraThinkingTable";
import { ColorsConfig } from "../src/components/mandora/types";

export type SAMPLE_KEY = 
  'YANG_YUNG_WEI'

const CONTENT_STR_LIST: Record<SAMPLE_KEY, string[][]> = {
  YANG_YUNG_WEI: [
    [
      '付出比別人多', '被支持被愛', '累積成功經驗', '重視細節', '嘗試新技術', '變化技', '一個人生活', '領悟教練的話', '判斷對錯'
    ],
    [
      '信任自己', '自信心', '成功做到教練要求', '訓練過程中攝影', '技術', '熟練度', '享受孤獨', '想法', '閱讀'
    ],
    [
      '訓練扎實', '家人支持', '想像力訓練', '檢視修正自己', '觀察隊友對手', '多向人請教', '觀察身邊事物', '與自己對話', '多學習'
    ],
    [
      '尊重對手', '自我喊話', '愈努力愈幸運', '自信心', '技術', '想法', '願意付出', '打開心房', '全力以赴'
    ],
    [
      '愛惜道服', '運氣', '按部就班做好每件事', '運氣', '奧運柔道金牌', '團隊信任', '同理心', '團隊信任', '遵守規定'
    ],
    [
      '清晰自我意識', '在比賽中表現積極', '幸運物', '人際關係', '心理', '力量體格', '懂得感恩', '給予平等對待', '更好的資源'
    ],
    [
      '願意幫助別人', '包容', '樂觀', '抗壓力', '心態正向正確', '情緒穩定', '重量訓練', '體重控制', '體脂肪'
    ],
    [
      '不要抱怨', '人際關係', '同理心', '回到當下', '心理', '做好充足準備', '強度大的對手', '力量體格', '體能'
    ],
    [
      '親切待人', '有禮貌', '接納他人', '心態想法成熟', '意象訓練', '不疾不徐冷靜思考', '核心訓練', '飲食維持', '握力訓練'
    ]
  ]
}

const COLORS: Record<SAMPLE_KEY, ColorsConfig> = {
  YANG_YUNG_WEI: {
    bgColor: {
      main: '#40B370',
      secondary: '#D3E8D5',
    },
    txtColor: {
      main: '#fff',
      secondary: '#111',
    }
  }
}

const convertStrListToMandoraTableListData = (strList: string[][]): SingleMandoraTableCellData[][] => {
  return strList.map(list => list.map(content => ({
    content,
  })))
}

const SAMPLE_MANDORA_LIST_DATA: {
  disabled?: boolean
  text: string
  value: SAMPLE_KEY | typeof SELECTOR_DEFAULT_VALUE | 'PERSONAL'
  listData: SingleMandoraTableCellData[][]
  isEditable: boolean
}[] = [
  {
    disabled: true,
    text: '選擇九宮格',
    value: SELECTOR_DEFAULT_VALUE,
    listData: [],
    isEditable: false,
  },
  {
    text: '自己的九宮格',
    value: 'PERSONAL',
    listData: [],
    isEditable: true,
  },
  {
    text: '楊勇緯的奧運柔道金牌思考九宮格(唯讀)',
    value: 'YANG_YUNG_WEI',
    listData: wrapListDataWithColor(
      convertStrListToMandoraTableListData(CONTENT_STR_LIST.YANG_YUNG_WEI)
    )(COLORS.YANG_YUNG_WEI),
    isEditable: false,
  }
]

export default SAMPLE_MANDORA_LIST_DATA;
