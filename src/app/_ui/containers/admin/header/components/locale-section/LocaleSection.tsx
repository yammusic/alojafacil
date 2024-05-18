import type { MouseEvent } from 'react'
import React, { useCallback, useState } from 'react'
import {
  Box,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material'

import { TranslateIcon } from '@/app/components'

export function LocaleSection() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const theme = useTheme()

  const onToggle = useCallback((e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }, [])

  const onClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return (
    <>
      <Box
        sx={ {
          ml: 2,
          mr: 3,
          [theme.breakpoints.down('md')]: {
            mr: 2
          }
        } }
      >
        <TranslateIcon
          aria-controls={ open ? 'menu-list-grow' : undefined }
          aria-expanded={ open ? 'true' : undefined }
          aria-haspopup="true"
          color="inherit"
          onPress={ onToggle }
          size={ 20 }
          sx={ {
            borderRadius: '12px',
            width: '34px',
            height: '34px',
            transition: 'all .2s ease-in-out',
            background: theme.palette.secondary.light,
            color: theme.palette.info.main,

            '&[aria-controls="menu-list-grow"],&:hover': {
              background: theme.palette.info.main,
              color: theme.palette.secondary.light
            }
          } }
        />

      </Box>

      <Menu
        PaperProps={ {
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            width: 140,
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 70 - 5,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        } }
        anchorEl={ anchorEl }
        anchorOrigin={ { horizontal: 'center', vertical: 'bottom' } }
        id="notification-menu-list"
        // onClick={ onClose }
        onClose={ onClose }
        open={ open }
        transformOrigin={ { horizontal: 'center', vertical: 'top' } }
      >
        <MenuItem sx={ { py: 1.5 } }>
          <Typography component="span" variant="body1">
            English
          </Typography>
        </MenuItem>

        <MenuItem sx={ { py: 1.5 } }>
          <Typography component="span" variant="body1">
            Spanish
          </Typography>
        </MenuItem>

        <MenuItem sx={ { py: 1.5 } }>
          <Typography component="span" variant="body1">
            French
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )
}
