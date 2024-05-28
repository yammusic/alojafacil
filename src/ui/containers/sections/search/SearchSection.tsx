'use client'

import React, { useCallback, useEffect, useState } from 'react'
import type { SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'
import { DateTime } from 'luxon'
import { Box, Button, Container, Divider, Grid, InputAdornment, useTheme } from '@mui/material'
import { AutocompleteElement, Controller, FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui'
import { DatePicker } from '@mui/x-date-pickers'
import { MdSearch } from 'react-icons/md'

import type { City } from '@/domain/db/features/City/model'
import { citiesOptions, useHotelsActions } from '@/domain/providers/store'
import { fetchCitiesByCountry } from '@/infra/services'

import { MenuGuests } from './MenuGuests'
import type { SearchFormValues, SearchSectionProps } from './props-types'
import styles from './styles.module.scss'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SearchSection({ onSearch }: Readonly<SearchSectionProps>) {
  const [anchorEl, setAnchorEl] = useState<EventTarget | HTMLElement | null>(null)
  const [adults, setAdults] = useState<number>(1)
  const [childrens, setChildrens] = useState<number>(0)
  const router = useRouter()

  const { palette } = useTheme()
  const { setCitiesOptions } = useHotelsActions()
  const cities = citiesOptions()

  const formCtx = useForm<SearchFormValues>({
    defaultValues: {
      checkIn: DateTime.now(),
      checkOut: DateTime.now().plus({ days: 1 }),
      adults: 1,
      childrens: 0,
    },
  })
  const { checkIn } = formCtx.watch()

  const loadCities = useCallback(async () => {
    if (!cities || cities.length === 0) {
      const { content: { data } } = await fetchCitiesByCountry(48)
      setCitiesOptions(data?.map((c: City) => ({ label: c.name, id: c.id })).sort((a, b) => a.label.localeCompare(b.label)))
    }
  }, [])

  useEffect(() => { loadCities() }, [])

  const onGuestClick = useCallback((e: SyntheticEvent) => {
    setAnchorEl(e.currentTarget)
  }, [])

  const onGuestClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const onSubmit = useCallback(async (data: SearchFormValues) => {
    setAnchorEl(null)
    const { checkIn, checkOut, cityId } = data
    if (!cityId) { return }

    const params = new URLSearchParams({
      ...data,
      checkIn: checkIn.toISODate(),
      checkOut: checkOut.toISODate(),
    } as any)

    router.push(`/search?${params.toString()}`)
  }, [])

  const onIncrementAdults = () => setAdults(adults + 1)
  const onDecrementAdults = () => setAdults(Math.max(1, adults - 1))
  const onIncrementChildren = () => setChildrens(childrens + 1)
  const onDecrementChildren = () => setChildrens(Math.max(0, childrens - 1))

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
        <FormContainer formContext={ formCtx } onSuccess={ onSubmit }>
          <Box className={ styles.searchContainer }>
            <AutocompleteElement
              matchId
              required
              label="Destination"
              name="cityId"
              options={ cities }
              rules={ { required: 'Destination is required' } }
              textFieldProps={ {
                variant: 'outlined',
                InputProps: { className: styles.destination }
              } }
            />

            <Divider />

            <Controller
              control={ formCtx.control }
              name="checkIn"
              render={ ({ field }) => (
                <DatePicker
                  { ...field }
                  format="dd/MM/yyyy"
                  label="Check in"
                  minDate={ DateTime.now() }
                  slotProps={ {
                    textField: {
                      variant: 'outlined',
                      InputProps: { className: styles.datePicker },
                    },
                  } }
                  value={ field.value ?? null }
                />
              ) }
            />

            <Divider />

            <Controller
              control={ formCtx.control }
              name="checkOut"
              render={ ({ field }) => (
                <DatePicker
                  { ...field }
                  format="dd/MM/yyyy"
                  label="Check out"
                  minDate={ checkIn?.plus({ 'days': 1 }) ?? DateTime.now().plus({ 'days': 1 }) }
                  slotProps={ {
                    textField: {
                      variant: 'outlined',
                      InputProps: { className: styles.datePicker },
                    },
                  } }
                  value={ field.value ?? null }
                />
              ) }
            />

            <Divider />

            <TextFieldElement
              InputProps={ {
                className: styles.guests,
                endAdornment: (
                  <InputAdornment position="end" sx={ { mr: -1 } }>
                    <Button
                      className={ styles.searchIcon }
                      color="secondary"
                      type="submit"
                    >
                      <MdSearch size={ 26 } />
                    </Button>
                  </InputAdornment>
                ),
                value: `${adults} adults, ${childrens} children`,
              } }
              label="Guests"
              name="guests"
              onClick={ onGuestClick }
              variant="outlined"
            />

            <MenuGuests
              adults={ adults }
              anchorEl={ anchorEl as Element }
              childrens={ childrens }
              onClose={ onGuestClose }
              onDecrementAdults={ onDecrementAdults }
              onDecrementChildren={ onDecrementChildren }
              onIncrementAdults={ onIncrementAdults }
              onIncrementChildren={ onIncrementChildren }
            />
          </Box>
        </FormContainer>
      </Container>
    </Grid>
  )
}
