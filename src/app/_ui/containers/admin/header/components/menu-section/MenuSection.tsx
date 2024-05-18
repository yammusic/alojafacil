import React from 'react'
import { Avatar, ButtonBase, useTheme } from '@mui/material'
import { MdMenu } from 'react-icons/md'

import type { MenuSectionProps } from './props-types'
import styles from './styles.module.scss'

export function MenuSection({ onPress }: Readonly<MenuSectionProps>) {
  const { palette } = useTheme()

  return (
    <ButtonBase className={ styles.menuBtnContainer } onClick={ onPress }>
      <Avatar
        className={ styles.menuBtn }
        sx={ {
          background: palette.secondary.light,
          color: palette.secondary.dark,

          '&:hover': {
            background: palette.secondary.dark,
            color: palette.secondary.light
          }
        } }
      >
        <MdMenu size={ 20 } />
      </Avatar>
    </ButtonBase>
  )
}
