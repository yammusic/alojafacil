import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  OutlinedInput,
  Stack,
  Switch,
  Typography
} from '@mui/material'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { IoSettingsOutline } from 'react-icons/io5'

export function ProfileSection() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const theme = useTheme()

  const onToggle = useCallback((e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }, [])

  const onClose = useCallback(() => {
    setAnchorEl(null)
  }, [])





  const customization = useSelector((state) => state.customization)

  const [sdm, setSdm] = useState(true)
  const [value, setValue] = useState('')
  const [notification, setNotification] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null)
  const handleLogout = async () => {
    console.log('Logout')
  }

  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index)
    handleClose(event)

    if (route && route !== '') {
      navigate(route)
    }
  }
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <>
      <Chip
        aria-controls={ open ? 'profile-list-grow' : undefined }
        aria-haspopup="true"
        color="primary"
        icon={
          <Avatar
            aria-controls={ open ? 'profile-list-grow' : undefined }
            aria-haspopup="true"
            color="inherit"
            ref={ anchorRef }
            // src={ User1 }
            sx={ {
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer'
            } }
          />
        }
        label={ <IoSettingsOutline color={ theme.palette.primary.main } size="1.5rem" /> }
        onClick={ onToggle }
        ref={ anchorRef }
        sx={ {
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,

          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,

            '& svg': {
              stroke: theme.palette.primary.light
            }
          },

          '& .MuiChip-label': {
            lineHeight: 0
          }
        } }
        variant="outlined"
      />

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
        id="profile-menu-list"
        // onClick={ onClose }
        onClose={ onClose }
        open={ open }
        transformOrigin={ { horizontal: 'right', vertical: 'top' } }
      >
        <Box sx={ { p: 2 } }>
          <Stack>
            <Stack alignItems="center" direction="row" spacing={ 0.5 }>
              <Typography variant="h4">Good Morning,</Typography>

              <Typography component="span" sx={ { fontWeight: 400 } } variant="h4">
                Johne Doe
              </Typography>
            </Stack>

            <Typography variant="subtitle2">Project Admin</Typography>
          </Stack>

          <OutlinedInput
            aria-describedby="search-helper-text"
            id="input-search-profile"
            inputProps={ {
                        'aria-label': 'weight'
                      } }
            onChange={ (e) => setValue(e.target.value) }
            placeholder="Search profile options"
            startAdornment={
              <InputAdornment position="start">
                {/* <IconSearch color={ theme.palette.grey[500] } size="1rem" stroke={ 1.5 } /> */}
              </InputAdornment>
                      }
            sx={ { width: '100%', pr: 1, pl: 2, my: 2 } }
            value={ value }
          />

          <Divider />
        </Box>

        <PerfectScrollbar style={ { height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' } }>
          <Box sx={ { p: 2 } }>
            {/* <UpgradePlanCard /> */}

            <Divider />

            <Card
              sx={ {
                bgcolor: theme.palette.primary.light,
                my: 2
              } }
            >
              <CardContent>
                <Grid container direction="column" spacing={ 3 }>
                  <Grid item>
                    <Grid
                      container
                      item
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item>
                        <Typography variant="subtitle1">Start DND Mode</Typography>
                      </Grid>

                      <Grid item>
                        <Switch
                          checked={ sdm }
                          color="primary"
                          name="sdm"
                          onChange={ (e) => setSdm(e.target.checked) }
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid
                      container
                      item
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item>
                        <Typography variant="subtitle1">Allow Notifications</Typography>
                      </Grid>

                      <Grid item>
                        <Switch
                          checked={ notification }
                          name="sdm"
                          onChange={ (e) => setNotification(e.target.checked) }
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Divider />

            <List
              component="nav"
              sx={ {
                width: '100%',
                maxWidth: 350,
                minWidth: 300,
                backgroundColor: theme.palette.background.paper,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                  minWidth: '100%'
                },
                '& .MuiListItemButton-root': {
                  mt: 0.5
                }
              } }
            >
              <ListItemButton
                onClick={ (event) => handleListItemClick(event, 0, '#') }
                selected={ selectedIndex === 0 }
                // sx={ { borderRadius: `${customization.borderRadius}px` } }
              >
                <ListItemIcon>
                  {/* <IconSettings size="1.3rem" stroke={ 1.5 } /> */}
                </ListItemIcon>

                <ListItemText primary={ <Typography variant="body2">Account Settings</Typography> } />
              </ListItemButton>

              <ListItemButton
                onClick={ (event) => handleListItemClick(event, 1, '#') }
                selected={ selectedIndex === 1 }
                // sx={ { borderRadius: `${customization.borderRadius}px` } }
              >
                <ListItemIcon>
                  {/* <IconUser size="1.3rem" stroke={ 1.5 } /> */}
                </ListItemIcon>

                <ListItemText
                  primary={
                    <Grid container justifyContent="space-between" spacing={ 1 }>
                      <Grid item>
                        <Typography variant="body2">Social Profile</Typography>
                      </Grid>

                      <Grid item>
                        <Chip
                          label="02"
                          size="small"
                          sx={ {
                            bgcolor: theme.palette.warning.dark,
                            color: theme.palette.background.default
                          } }
                        />
                      </Grid>
                    </Grid>
                            }
                />
              </ListItemButton>

              <ListItemButton
                onClick={ handleLogout }
                selected={ selectedIndex === 4 }
                // sx={ { borderRadius: `${customization.borderRadius}px` } }
              >
                <ListItemIcon>
                  {/* <IconLogout size="1.3rem" stroke={ 1.5 } /> */}
                </ListItemIcon>

                <ListItemText primary={ <Typography variant="body2">Logout</Typography> } />
              </ListItemButton>
            </List>
          </Box>
        </PerfectScrollbar>
      </Menu>

      {/* <Popper
        disablePortal
        transition
        anchorEl={ anchorRef.current }
        open={ open }
        placement="bottom-end"
        popperOptions={ {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        } }
        role={ undefined }
      >
        {({ TransitionProps }) => (
          <Transitions in={ open } { ...TransitionProps }>
            <Paper>
              <ClickAwayListener onClickAway={ handleClose }>
                <MainCard
                  boxShadow
                  border={ false }
                  content={ false }
                  elevation={ 16 }
                  shadow={ theme.shadows[16] }
                >
                  <Box sx={ { p: 2 } }>
                    <Stack>
                      <Stack alignItems="center" direction="row" spacing={ 0.5 }>
                        <Typography variant="h4">Good Morning,</Typography>

                        <Typography component="span" sx={ { fontWeight: 400 } } variant="h4">
                          Johne Doe
                        </Typography>
                      </Stack>

                      <Typography variant="subtitle2">Project Admin</Typography>
                    </Stack>

                    <OutlinedInput
                      aria-describedby="search-helper-text"
                      id="input-search-profile"
                      inputProps={ {
                        'aria-label': 'weight'
                      } }
                      onChange={ (e) => setValue(e.target.value) }
                      placeholder="Search profile options"
                      startAdornment={
                        <InputAdornment position="start">
                          <IconSearch color={ theme.palette.grey[500] } size="1rem" stroke={ 1.5 } />
                        </InputAdornment>
                      }
                      sx={ { width: '100%', pr: 1, pl: 2, my: 2 } }
                      value={ value }
                    />

                    <Divider />
                  </Box>

                  <PerfectScrollbar style={ { height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' } }>
                    <Box sx={ { p: 2 } }>
                      <UpgradePlanCard />

                      <Divider />

                      <Card
                        sx={ {
                          bgcolor: theme.palette.primary.light,
                          my: 2
                        } }
                      >
                        <CardContent>
                          <Grid container direction="column" spacing={ 3 }>
                            <Grid item>
                              <Grid
                                container
                                item
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography variant="subtitle1">Start DND Mode</Typography>
                                </Grid>

                                <Grid item>
                                  <Switch
                                    checked={ sdm }
                                    color="primary"
                                    name="sdm"
                                    onChange={ (e) => setSdm(e.target.checked) }
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>

                            <Grid item>
                              <Grid
                                container
                                item
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography variant="subtitle1">Allow Notifications</Typography>
                                </Grid>

                                <Grid item>
                                  <Switch
                                    checked={ notification }
                                    name="sdm"
                                    onChange={ (e) => setNotification(e.target.checked) }
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>

                      <Divider />

                      <List
                        component="nav"
                        sx={ {
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%'
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5
                          }
                        } }
                      >
                        <ListItemButton
                          onClick={ (event) => handleListItemClick(event, 0, '#') }
                          selected={ selectedIndex === 0 }
                          sx={ { borderRadius: `${customization.borderRadius}px` } }
                        >
                          <ListItemIcon>
                            <IconSettings size="1.3rem" stroke={ 1.5 } />
                          </ListItemIcon>

                          <ListItemText primary={ <Typography variant="body2">Account Settings</Typography> } />
                        </ListItemButton>

                        <ListItemButton
                          onClick={ (event) => handleListItemClick(event, 1, '#') }
                          selected={ selectedIndex === 1 }
                          sx={ { borderRadius: `${customization.borderRadius}px` } }
                        >
                          <ListItemIcon>
                            <IconUser size="1.3rem" stroke={ 1.5 } />
                          </ListItemIcon>

                          <ListItemText
                            primary={
                              <Grid container justifyContent="space-between" spacing={ 1 }>
                                <Grid item>
                                  <Typography variant="body2">Social Profile</Typography>
                                </Grid>

                                <Grid item>
                                  <Chip
                                    label="02"
                                    size="small"
                                    sx={ {
                                      bgcolor: theme.palette.warning.dark,
                                      color: theme.palette.background.default
                                    } }
                                  />
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton>

                        <ListItemButton
                          onClick={ handleLogout }
                          selected={ selectedIndex === 4 }
                          sx={ { borderRadius: `${customization.borderRadius}px` } }
                        >
                          <ListItemIcon>
                            <IconLogout size="1.3rem" stroke={ 1.5 } />
                          </ListItemIcon>

                          <ListItemText primary={ <Typography variant="body2">Logout</Typography> } />
                        </ListItemButton>
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper> */}
    </>
  )
}

export default ProfileSection
