
type ColorKey = 'bgColor' | 'txtColor'
export type ColorsConfig = {
  [x in ColorKey]: {
    main: string
    secondary: string
  }
}