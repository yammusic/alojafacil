'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Box, Snackbar } from '@mui/material'

import { DataGrid } from '@/app/containers'
import { hotelsData, useHotelsActions } from '@/domain/providers/store'
import type { HotelAttributes } from '@/domain/db/features/Hotel/types'
import type { HotelResponse } from '@/infra/services'
import { createHotel, deleteHotel, fetchHotels, updateHotel } from '@/infra/services'

import columns from './columns'
import { HotelModal } from '../modal'
import { DeleteAlert } from './DeleteAlert'



export function HotelsList() {
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [modeModal, setModeModal] = useState<'view' | 'edit' | 'add'>('add')
  const [selectedHotel, setSelectedHotel] = useState<HotelAttributes | null>()
  const { setHotels } = useHotelsActions()
  const hotels = hotelsData()

  const loadHotels = async() => {
    const { content: { data } } = await fetchHotels()
    setHotels(data as any)
    setLoading(false)
  }

  useEffect(() => { loadHotels() }, [])

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
    if (!selectedHotel) return
    setOpenAlert(false)
    setLoading(true)

    const { content: { message } } = await deleteHotel(selectedHotel?.id as number)
    setNotification(message)
    setOpenSnackbar(true)

    await loadHotels()
  }, [selectedHotel])

  const onSubmit = useCallback(async (data: HotelAttributes) => {
    setOpenModal(false)
    setLoading(true)
    let response: HotelResponse
    console.info({ data, modeModal })

    try {
      if (modeModal === 'edit') {
        response = await updateHotel(data)
      } else if (modeModal === 'add') {
        response = await createHotel(data)
      } else { return }

      setNotification(response?.content?.message)
      setOpenSnackbar(true)

      await loadHotels()
    } catch (error: any) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [selectedHotel, modeModal])

  const onAddClick = useCallback(() => {
    setSelectedHotel(null)
    setModeModal('add')
    setOpenModal(true)
  }, [])

  const onEditClick = useCallback((item: HotelAttributes) => {
    setSelectedHotel(item)
    setModeModal('edit')
    setOpenModal(true)
  }, [])

  const onDeleteClick = useCallback((item: HotelAttributes) => {
    setSelectedHotel(item)
    setOpenAlert(true)
  }, [])

  const onViewClick = useCallback((item: HotelAttributes) => {
    setSelectedHotel(item)
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
        loading={ !hotels || !hotels.length || loading }
        onAddClick={ onAddClick }
        onDeleteClick={ onDeleteClick }
        onEditClick={ onEditClick }
        onViewClick={ onViewClick }
        rows={ hotels }
      />

      <HotelModal
        hotel={ selectedHotel }
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
