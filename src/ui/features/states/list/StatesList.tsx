'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Box, Alert, Snackbar } from '@mui/material'

import { DataGrid } from '@/app/containers'
import { appCountries, useAppActions, useAppState } from '@/domain/providers/store'
import type { StateAttributes } from '@/domain/db/features/State/types'
import type { CountryResponse } from '@/infra/services'
import {
  createCountry,
  deleteCountry,
  fetchCountries,
  fetchStates,
  updateCountry,
} from '@/infra/services'

import columns from './columns'
import { StateModal } from '../modal'
import { DeleteAlert } from './DeleteAlert'

export function StatesList() {
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [modeModal, setModeModal] = useState<'view' | 'edit' | 'add'>('add')
  const [selectedState, setSelectedState] = useState<StateAttributes | null>()
  const { setStates } = useAppActions()
  const { states } = useAppState()

  const loadStates = async() => {
    const { content: { data } } = await fetchStates()
    setStates(data as any)
    setLoading(false)
  }

  useEffect(() => { loadStates() }, [])

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
    if (!selectedState) return
    setOpenAlert(false)
    setLoading(true)

    const { content: { message } } = await deleteCountry(selectedState.id)
    setNotification(message)
    setOpenSnackbar(true)

    await loadStates()
  }, [selectedState])

  const onSubmit = useCallback(async (data: StateAttributes) => {
    setOpenModal(false)
    setLoading(true)
    let response: CountryResponse
    console.info({ data, modeModal })

    try {
      if (modeModal === 'edit') {
        // response = await updateCountry(data)
      } else if (modeModal === 'add') {
        // response = await createCountry(data)
      } else { return }

      // setNotification(response?.content?.message)
      // setOpenSnackbar(true)

      await loadStates()
    } catch (error: any) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [selectedState, modeModal])

  const onAddClick = useCallback(() => {
    setSelectedState(null)
    setModeModal('add')
    setOpenModal(true)
  }, [])

  const onEditClick = useCallback((item: StateAttributes) => {
    setSelectedState(item)
    setModeModal('edit')
    setOpenModal(true)
  }, [])

  const onDeleteClick = useCallback((item: StateAttributes) => {
    setSelectedState(item)
    setOpenAlert(true)
  }, [])

  const onViewClick = useCallback((item: StateAttributes) => {
    setSelectedState(item)
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
        loading={ !states || !states.length || loading }
        onAddClick={ onAddClick }
        onDeleteClick={ onDeleteClick }
        onEditClick={ onEditClick }
        onViewClick={ onViewClick }
        rows={ states }
      />

      <StateModal
        state={ selectedState }
        mode={ modeModal }
        onClose={ onToggleModal }
        onSubmit={ onSubmit }
        open={ openModal }
      />

      <DeleteAlert
        onClose={ onCloseAlert }
        onConfirm={ onConfirmDelete }
        open={ openAlert }
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
