'use client'

import React, { useCallback, useEffect, useState } from 'react'
import type { SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'
import { DateTime } from 'luxon'
import { Box, Button, Container, Divider, Grid, InputAdornment, Select, MenuItem, Typography } from '@mui/material'
import { AutocompleteElement, Controller, FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui'
import { DatePicker } from '@mui/x-date-pickers'
import { MdSearch } from 'react-icons/md'

import type { City } from '@/domain/db/features/City/model'
import { citiesOptions, useHotelsActions } from '@/domain/providers/store'
import { fetchCitiesByCountry } from '@/infra/services'

import { MenuGuests } from '../search/MenuGuests'
import type { FilterFormValues, FilterSectionProps } from './props-types'
import styles from './styles.module.scss'

const SORT_OPTIONS = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Price lowest', value: 'priceLowest' },
  { label: 'Price highest', value: 'priceHighest' },
  { label: 'Rating lowest', value: 'ratingLowest' },
  { label: 'Rating highest', value: 'ratingHighest' },
]

export function FilterSection(props: Readonly<FilterSectionProps>) {
  const { values, onSort } = props
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState<EventTarget | HTMLElement | null>(null)
  const [adults, setAdults] = useState<number>(Number(values?.adults ?? 1))
  const [childrens, setChildrens] = useState<number>(Number(values?.childrens ?? 0))

  const { setCitiesOptions } = useHotelsActions()
  const cities = citiesOptions()

  const formCtx = useForm<FilterFormValues>({
    defaultValues: {
      cityId: 0,
      checkIn: DateTime.now(),
      checkOut: DateTime.now().plus({ days: 1 }),
      adults: 1,
      childrens: 0,
    },
    values: {
      checkIn: DateTime.fromISO(values?.checkIn as any),
      checkOut: DateTime.fromISO(values?.checkOut as any),
      cityId: Number(values?.cityId),
      adults: Number(values?.adults),
      childrens: Number(values?.childrens),
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
    // formCtx.setValue('adults', adults)
    // formCtx.setValue('childrens', childrens)
  }, [])

  const onSubmit = useCallback(async (data: FilterFormValues) => {
    setAnchorEl(null)
    const { checkIn, checkOut, cityId, adults, childrens } = data
    router.push(`/search?checkIn=${checkIn.toISODate()}&checkOut=${checkOut.toISODate()}&cityId=${cityId}&adults=${adults}&childrens=${childrens}`)
  }, [])

  const onSortChange = useCallback((e: any) => {
    onSort?.(e.target.value)
  }, [])

  const onIncrementAdults = () => {
    const value = adults + 1
    setAdults(value)
    formCtx.setValue('adults', value)
  }

  const onDecrementAdults = () => {
    const value = Math.max(1, adults - 1)
    setAdults(value)
    formCtx.setValue('adults', value)
  }

  const onIncrementChildren = () => {
    const value = childrens + 1
    setChildrens(value)
    formCtx.setValue('childrens', value)
  }

  const onDecrementChildren = () => {
    const value = Math.max(0, childrens - 1)
    setChildrens(value)
    formCtx.setValue('childrens', value)
  }

  return (
    <Grid
      container
      className={ styles.container }
      component="section"
    >
      <Container>
        <FormContainer formContext={ formCtx } onSuccess={ onSubmit }>
          <Box className={ styles.searchContainer }>
            <AutocompleteElement
              matchId
              label="Destination"
              name="cityId"
              options={ cities }
              textFieldProps={ {
                variant: 'outlined',
                InputProps: { className: styles.destination },
                value: formCtx.watch('cityId'),
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
                value: `${formCtx.watch('adults')} adults, ${formCtx.watch('childrens')} children`,
              } }
              label="Guests"
              name="guests"
              onClick={ onGuestClick }
              variant="outlined"
            />

            <MenuGuests
              adults={ formCtx.watch('adults') }
              anchorEl={ anchorEl as Element }
              childrens={ formCtx.watch('childrens') }
              onClose={ onGuestClose }
              onDecrementAdults={ onDecrementAdults }
              onDecrementChildren={ onDecrementChildren }
              onIncrementAdults={ onIncrementAdults }
              onIncrementChildren={ onIncrementChildren }
            />
          </Box>
        </FormContainer>

        <Box sx={ { display: 'flex', gap: 1, alignItems: 'center', mt: 3, justifyContent: 'flex-end', px: 16 } }>
          <Typography fontWeight="bold" variant="body1">Sort by</Typography>

          <Select
            defaultValue={ SORT_OPTIONS[0].value }
            id="sort"
            name="sort"
            onChange={ onSortChange }
            variant="outlined"
          >
            { SORT_OPTIONS.map(({ label, value }) => (
              <MenuItem key={ value } value={ value }>
                { label }
              </MenuItem>
            )) }
          </Select>
        </Box>
      </Container>
    </Grid>
  )
}
