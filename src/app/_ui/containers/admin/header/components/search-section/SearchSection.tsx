import type { ChangeEvent } from 'react'
import React, { useCallback, useState } from 'react'
import { InputAdornment, OutlinedInput, useTheme } from '@mui/material'

import { ClearIcon, SearchIcon } from '../../../../components/common'

import type { SearchSectionProps } from './props-types'
import styles from './styles.module.scss'

export function SearchSection({ onSearch }: Readonly<SearchSectionProps>) {
  const [value, setValue] = useState<string>('')
  const { palette, breakpoints } = useTheme()

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  const onClear = useCallback(() => {
    setValue('')
  }, [])

  return (
    <OutlinedInput
      aria-describedby="search-helper-text"
      className={ styles.searchInputContainer }
      endAdornment={
        <InputAdornment position="end">
          {/* <AdjustmentsIcon sx={ { display: 'none' } } /> */}

          <ClearIcon
            color={ palette.error.dark }
            onPress={ onClear }
            sx={ { display: value ? 'inline-flex' : 'none' } }
          />
        </InputAdornment>
      }
      id="input-search-header"
      inputProps={ { 'aria-label': 'weight' } }
      onChange={ onChange }
      placeholder="Search"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon size={ 26 } />
        </InputAdornment>
      }
      sx={ {
        '& input': {
          background: 'transparent !important',
          paddingLeft: '4px !important'
        },
        [breakpoints.down('lg')]: {
          width: 250
        },
        [breakpoints.down('md')]: {
          width: '100%',
          marginLeft: 4,
          background: '#fff'
        }
      } }
      value={ value }
    />
  )
}
