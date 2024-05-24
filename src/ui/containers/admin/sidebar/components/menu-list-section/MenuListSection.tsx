import React from 'react'
import type { Theme } from '@mui/material'
import { Box, useMediaQuery } from '@mui/material'
import { BrowserView, MobileView } from 'react-device-detect'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { DRAWER_WIDTH_SMALL } from '@/domain/constants'
import { themeDrawerWidth } from '@/domain/providers/store'
import { LogoSection } from '../../../../header/components'
import { MenuList } from './components'
import { VersionSection } from '../version-section'
import styles from './styles.module.scss'

export function MenuListSection() {
  const matchUpMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const drawerWidth = themeDrawerWidth()
  const isSmallDrawer = drawerWidth === DRAWER_WIDTH_SMALL

  return (
    <>
      <Box sx={ { display: { xs: 'block', md: 'none' } } }>
        <Box className={ styles.logoContainer }>
          <LogoSection />
        </Box>
      </Box>

      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={ {
            height: (
              !matchUpMd
                ? 'calc(95vh - 56px)'
                : 'calc(100vh - 64px)'
            ),
            paddingLeft: '16px',
            paddingRight: '16px',
          } }
        >
          <MenuList />

          { !isSmallDrawer && <VersionSection /> }
        </PerfectScrollbar>
      </BrowserView>

      <MobileView>
        <Box sx={ { px: 2 } }>
          <MenuList />

          { !isSmallDrawer && <VersionSection /> }
        </Box>
      </MobileView>
    </>
  )
}
