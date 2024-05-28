'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { DataGrid } from '@/app/containers/data-grid/DataGrid'
import { DeleteAlert } from '@/app/components/delete-alert/DeleteAlert'

import { appCountries, useAppActions } from '@/domain/providers/store/features/app'
import type { CountryAttributes } from '@/domain/db/features/Country/types'

import type { CountryResponse } from '@/infra/services/region/countries'
import {
  createCountry,
  deleteCountry,
  fetchCountries,
  updateCountry,
} from '@/infra/services'

import { CountryModal } from '../modal'
import columns from './columns'

export function CountriesList() {
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [modeModal, setModeModal] = useState<'view' | 'edit' | 'add'>('add')
  const [selectedCountry, setSelectedCountry] = useState<CountryAttributes | null>()
  const { setCountries } = useAppActions()
  const countries = appCountries()

  const loadCountries = useCallback(async() => {
    const { content: { data } } = await fetchCountries()
    setCountries(data as any)
    setLoading(false)
  }, [])

  useEffect(() => { loadCountries() }, [])

  const onToggleModal = useCallback((_: any, reason: string) => {
    if (reason !== 'backdropClick') {
      setOpenModal(!openModal)
    }
  }, [openModal])

  const onCloseSnackbar = useCallback(() => {
    setOpenSnackbar(false)
  }, [])

  const onCloseAlert = useCallback(() => {
    setOpenAlert(false)
  }, [])

  const onConfirmDelete = useCallback(async () => {
    if (!selectedCountry) return
    setOpenAlert(false)
    setLoading(true)

    const { content: { message } } = await deleteCountry(selectedCountry.id)
    setNotification(message)
    setOpenSnackbar(true)

    await loadCountries()
  }, [selectedCountry])

  const onSubmit = useCallback(async (data: CountryAttributes) => {
    setOpenModal(false)
    setLoading(true)
    let response: CountryResponse
    console.info({ data, modeModal })

    try {
      if (modeModal === 'edit') {
        response = await updateCountry(data)
      } else if (modeModal === 'add') {
        response = await createCountry(data)
      } else { return }

      setNotification(response?.content?.message)
      setOpenSnackbar(true)

      await loadCountries()
    } catch (error: any) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [selectedCountry, modeModal])

  const onAddClick = useCallback(() => {
    setSelectedCountry(null)
    setModeModal('add')
    setOpenModal(true)
  }, [])

  const onEditClick = useCallback((item: CountryAttributes) => {
    setSelectedCountry(item)
    setModeModal('edit')
    setOpenModal(true)
  }, [])

  const onDeleteClick = useCallback((item: CountryAttributes) => {
    setSelectedCountry(item)
    setOpenAlert(true)
  }, [])

  const onViewClick = useCallback((item: CountryAttributes) => {
    setSelectedCountry(item)
    setModeModal('view')
    setOpenModal(true)
  }, [])

  return (
    <Box>
      <DataGrid
        disableRowSelectionOnClick
        useActions
        useAddButton
        columns={ columns }
        loading={ !countries || !countries.length || loading }
        onAddClick={ onAddClick }
        onDeleteClick={ onDeleteClick }
        onEditClick={ onEditClick }
        onViewClick={ onViewClick }
        rows={ countries }
      />

      <CountryModal
        country={ selectedCountry }
        mode={ modeModal }
        onClose={ onToggleModal }
        onSubmit={ onSubmit }
        open={ openModal }
      />

      <DeleteAlert
        message="Are you sure you want to delete this country?"
        onClose={ onCloseAlert }
        onConfirm={ onConfirmDelete }
        open={ openAlert }
        title="Delete Country"
      />

      <Snackbar
        anchorOrigin={ { vertical: 'top', horizontal: 'right' } }
        autoHideDuration={ 3000 }
        onClose={ onCloseSnackbar }
        open={ openSnackbar }
      >
        <Alert
          onClose={ onCloseSnackbar }
          severity="success"
          sx={ { width: '100%' } }
          variant="filled"
        >
          { notification }
        </Alert>
      </Snackbar>
    </Box>
  )
}
