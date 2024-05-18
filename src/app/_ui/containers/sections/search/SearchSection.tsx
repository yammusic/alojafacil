'use client'

import React from 'react'
import { Box, Button, Container, Divider, Grid, InputAdornment, useTheme } from '@mui/material'
import { AutocompleteElement, FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { DatePicker } from '@mui/x-date-pickers'

import { ClearIcon, SearchIcon } from '../../../components/common'
import type { SearchSectionProps } from './props-types'
import styles from './styles.module.scss'
import { MdSearch } from 'react-icons/md'

export function SearchSection({ onSearch }: Readonly<SearchSectionProps>) {
  const { palette } = useTheme()
  // const [value, setValue] = useState<string>('')
  // const { palette, breakpoints } = useTheme()

  // const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
  //   setValue(e.target.value)
  // }, [])

  // const onClear = useCallback(() => {
  //   setValue('')
  // }, [])

  return (
    <Grid
      container
      className={ styles.container }
      component="section"
      sx={ {
        bgcolor: palette.grey[100],
      } }
    >
      <Container>
        <FormContainer>
          <Box className={ styles.searchContainer }>
            <AutocompleteElement
              label="Destination"
              name="destination"
              options={ [ 'Cartagena', 'San Andres', 'Medellín' ] }
              textFieldProps={ {
                variant: 'outlined',
                InputProps: { className: styles.destination }
              } }
            />

            <Divider />

            <DatePicker
              format="dd/MM/yyyy"
              label="Check in"
              name="checkIn"
              slotProps={ {
                textField: {
                  variant: 'outlined',
                  InputProps: { className: styles.datePicker },
                },
              } }
            />

            <Divider />

            <DatePicker
              format="dd/MM/yyyy"
              label="Check out"
              name="checkOut"
              slotProps={ {
                textField: {
                  variant: 'outlined',
                  InputProps: { className: styles.datePicker },
                },
              } }
            />

            <Divider />

            <TextFieldElement
              InputProps={ {
                className: styles.guests,
                endAdornment: (
                  <InputAdornment position="end" sx={ { mr: -1 } }>
                    <Button color="secondary" sx={ { borderRadius: '50%', p: 0, minWidth: '42px', height: '42px' } }>
                      <MdSearch size={ 26 } />
                    </Button>

                    {/* <SearchIcon size={ 26 } sx={ { color: palette.grey[500], bgcolor: 'secondary.dark' } } /> */}
                  </InputAdornment>
                ),
              } }
              label="Guests"
              name="guests"
              variant="outlined"
            />
          </Box>

          { /* <OutlinedInput
            aria-describedby="search-helper-text"
            className={ styles.searchInputContainer }
            endAdornment={
              <InputAdornment position="end">
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
          /> */ }
        </FormContainer>
      </Container>
    </Grid>
  )
}
