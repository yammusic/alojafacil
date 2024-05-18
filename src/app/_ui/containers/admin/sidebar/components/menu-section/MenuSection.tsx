import React from 'react'
import type { Theme } from '@mui/material'
import { Box, useMediaQuery } from '@mui/material'
import { BrowserView, MobileView } from 'react-device-detect'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { LogoSection } from '../logo-section'
import { MenuList } from './menu-list'
import { VersionSection } from '../version-section'

export function MenuSection() {
  const matchUpMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  return (
    <>
      <Box sx={ { display: { xs: 'block', md: 'none' } } }>
        <Box sx={ { display: 'flex', p: 2, mx: 'auto' } }>
          <LogoSection />
        </Box>
      </Box>

      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={ {
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
            paddingLeft: '16px',
            paddingRight: '16px',
          } }
        >
          <MenuList />

          {/* <MenuCard /> */}

          <VersionSection />
        </PerfectScrollbar>
      </BrowserView>

      <MobileView>
        <Box sx={ { px: 2 } }>
          <MenuList />

          {/* <MenuCard /> */}

          <VersionSection />
        </Box>
      </MobileView>
    </>
  )
}
