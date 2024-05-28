'use client'

import React, { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTheme } from '@mui/material/styles'
import type { SyntheticEvent } from 'react'
import {
  Avatar,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Stack,
  Typography
} from '@mui/material'

import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5'
// import { RiListSettingsLine } from 'react-icons/ri'
import { AiOutlineDashboard } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'

import { appCurrentUser, useAppActions } from '@/domain/providers/store'
import { authLogout } from '@/infra/services'

import type { ProfileSectionProps } from './props-types'
import styles from './styles.module.scss'


export function ProfileSection({ admin }: Readonly<ProfileSectionProps>) {
  const { palette } = useTheme()
  const router = useRouter()
  const currentUser = appCurrentUser() as any
  const { setCurrentUser } = useAppActions()
  const userAdmin = currentUser?.roles?.includes('admin') ?? false

  const [isLoading, setIsLoading] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const anchorRef = useRef(null)
  const open = Boolean(anchorEl)

  const onToggle = useCallback((e: SyntheticEvent) => {
    setAnchorEl(e.currentTarget as HTMLElement)
  }, [])

  const onClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const onLogout = useCallback(async () => {
    setIsLoading(true)

    try {
      await authLogout({ accessToken: currentUser?.accessToken })
      setCurrentUser(null)
      router.push('/')
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
      onClose()
    }
  }, [])

  if (!currentUser) {
    return (
      <>
        <Link href="/auth/sign-up">
          <Button className={ styles.authBtn } variant="text">
            Sign Up
          </Button>
        </Link>

        <Link href="/auth/sign-in">
          <Button className={ styles.authBtn } variant="contained">
            Sign In
          </Button>
        </Link>
      </>
    )
  }

  return (
    <>
      <Chip
        aria-controls={ open ? 'profile-list-grow' : undefined }
        aria-haspopup="true"
        className={ styles.chip }
        icon={ <Avatar className={ styles.avatar } color="inherit" /> }
        label={ <IoSettingsOutline color={ palette.primary.main } size="1.6rem" /> }
        onClick={ onToggle }
        ref={ anchorRef }
        sx={ {
          '&[aria-controls="profile-list-grow"], &:hover': {
            borderColor: palette.primary.main,
            background: `${palette.primary.main} !important`,
            color: palette.primary.light,

            '& svg': {
              stroke: palette.common.white,
            }
          },

          '& .MuiChip-label': {
            lineHeight: 0
          },
        } }
        variant="outlined"
      />

      <Menu
        PaperProps={ {
          elevation: 0,
          className: styles.menu,
          sx: {
            '&::before': {
              bgcolor: 'background.paper',
            },
          },
        } }
        anchorEl={ anchorEl }
        anchorOrigin={ { horizontal: 'right', vertical: 'bottom' } }
        id="profile-menu-list"
        onClose={ onClose }
        open={ open }
        transformOrigin={ { horizontal: 'right', vertical: 'top' } }
      >
        <Grid container>
          <Grid item p={ 2 } xs={ 12 }>
            <Stack direction="row" spacing={ 1 }>
              <Typography variant="h5">Hi,</Typography>

              <Typography variant="h5">
                { currentUser.username }
              </Typography>
            </Stack>

            <Typography
              color={ palette.grey[600] }
              fontSize={ 13 }
              ml={ 0.25 }
              variant="subtitle2"
            >
              { currentUser?.roles?.join(', ') }
            </Typography>
          </Grid>

          <Grid item xs={ 12 }>
            <Divider />
          </Grid>
        </Grid>

        <Grid item xs={ 12 }>
          <List>
            {/* Dashboard */}
            <ListItemButton LinkComponent={ Link } href={ !admin ? '/admin' : '/' }>
              <ListItemIcon className={ styles.icon }>
                { (!admin && userAdmin) ? (
                  <AiOutlineDashboard size={ 18 } />
                ) : (
                  <IoHomeOutline size={ 18 } />
                ) }
              </ListItemIcon>

              <ListItemText>
                <Typography variant="body2">
                  { (!admin && userAdmin) ? 'Dashboard' : 'Home' }
                </Typography>
              </ListItemText>
            </ListItemButton>

            {/* Account Settings */}
            {/* <ListItemButton>
              <ListItemIcon className={ styles.icon }>
                <RiListSettingsLine size={ 18 } />
              </ListItemIcon>

              <ListItemText>
                <Typography variant="body2">Account Settings</Typography>
              </ListItemText>
            </ListItemButton> */}

            {/* Logout */}
            <ListItemButton disabled={ isLoading } onClick={ onLogout }>
              <ListItemIcon className={ styles.icon }>
                <FiLogOut size={ 18 } />
              </ListItemIcon>

              <ListItemText className={ styles.label }>
                { isLoading ? (
                  <CircularProgress className={ styles.loader } size={ 16 } />
                ) : (
                  <Typography variant="body2">Logout</Typography>
                ) }
              </ListItemText>
            </ListItemButton>
          </List>
        </Grid>

      </Menu>
    </>
  )
}

export default ProfileSection
