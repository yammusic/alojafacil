import type { ThemeColorMode } from '@/domain/providers'

export interface ThemeState {
  borderRadius: number
  colorMode: ThemeColorMode
  drawerOpen: boolean
  drawerWidth: number
  fontFamily: string
}
