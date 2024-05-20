import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import type { MouseEvent } from 'react'
import {
  Box,
  Chip,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { BellIcon } from '@/app/components'

const status = [
  { label: 'All', value: 'all' },
  { label: 'New', value: 'new' },
  { label: 'Read', value: 'read' },
  { label: 'Unread', value: 'unread' },
]

export function NotificationSection() {
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
        <BellIcon
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
            color: theme.palette.warning.dark,

            '&[aria-controls="menu-list-grow"],&:hover': {
              background: theme.palette.warning.dark,
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
            width: 330,
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        } }
        anchorEl={ anchorEl }
        anchorOrigin={ { horizontal: 'right', vertical: 'bottom' } }
        id="notification-menu-list"
        // onClick={ onClose }
        onClose={ onClose }
        open={ open }
        transformOrigin={ { horizontal: 'right', vertical: 'top' } }
      >
        <Grid container direction="column" spacing={ 2 }>
          <Grid item xs={ 12 }>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={ { pt: 2, px: 2 } }
            >
              <Grid item>
                <Stack direction="row" spacing={ 2 }>
                  <Typography variant="h4">All Notification</Typography>

                  <Chip
                    label="01"
                    size="small"
                    sx={ {
                      color: theme.palette.background.default,
                      bgcolor: theme.palette.warning.dark,
                    } }
                  />
                </Stack>
              </Grid>

              <Grid item>
                <Typography
                  color="primary"
                  // component={ Link }
                  // href="#"
                  sx={ { fontSize: '0.75rem' } }
                  // to="#"
                  variant="body2"
                >
                  Mark as all read
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={ 12 }>
            <PerfectScrollbar style={ { height: '100%', maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden' } }>
              <Grid container direction="column" spacing={ 2 }>
                <Grid item xs={ 12 }>
                  <Box sx={ { px: 2, pt: 0.25 } }>
                    <TextField
                      fullWidth
                      select
                      SelectProps={ { native: true } }
                      id="outlined-select-currency-native"
                    >
                      { status.map((option) => (
                        <option key={ option.value } value={ option.value }>
                          {option.label}
                        </option>
                      )) }
                    </TextField>
                  </Box>
                </Grid>

                <Grid item p={ 0 } xs={ 12 }>
                  <Divider />
                </Grid>
              </Grid>
            </PerfectScrollbar>
          </Grid>
        </Grid>

        <Divider />

        <MenuItem onClick={ onClose } sx={ { p: 1.25, justifyContent: 'center' } }>
          <Typography color="primary" variant="body2">
            View All
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )
}
