import type { ThemeColorMode } from '@/domain/providers/theme'

export interface ThemeState {
  borderRadius: number
  colorMode: ThemeColorMode
  drawerOpen: boolean
  drawerWidth: number
  fontFamily: string
}
