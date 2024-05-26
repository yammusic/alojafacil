'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Box, Snackbar } from '@mui/material'

import { DataGrid } from '@/app/containers'
import { roomsData, useHotelsActions } from '@/domain/providers/store'
import type { RoomAttributes } from '@/domain/db/features/Room/types'
import type { RoomResponse } from '@/infra/services'
import { createRoom, deleteRoom, fetchRooms, updateRoom } from '@/infra/services'

import columns from './columns'
import { RoomModal } from '../modal'
import { DeleteAlert } from './DeleteAlert'

export function RoomsList() {
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [modeModal, setModeModal] = useState<'view' | 'edit' | 'add'>('add')
  const [selectedRoom, setSelectedRoom] = useState<RoomAttributes | null>()
  const { setRooms } = useHotelsActions()
  const rooms = roomsData()

  const loadRooms = async() => {
    const { content: { data } } = await fetchRooms()
    setRooms(data as any)
    setLoading(false)
  }

  useEffect(() => { loadRooms() }, [])

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
    if (!selectedRoom) return
    setOpenAlert(false)
    setLoading(true)

    const { content: { message } } = await deleteRoom(selectedRoom?.id as number)
    setNotification(message)
    setOpenSnackbar(true)

    await loadRooms()
  }, [selectedRoom])

  const onSubmit = useCallback(async (data: RoomAttributes) => {
    setOpenModal(false)
    setLoading(true)
    let response: RoomResponse
    console.info({ data, modeModal })

    try {
      if (modeModal === 'edit') {
        response = await updateRoom(data)
      } else if (modeModal === 'add') {
        response = await createRoom(data)
      } else { return }

      setNotification(response?.content?.message)
      setOpenSnackbar(true)

      await loadRooms()
    } catch (error: any) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [selectedRoom, modeModal])

  const onAddClick = useCallback(() => {
    setSelectedRoom(null)
    setModeModal('add')
    setOpenModal(true)
  }, [])

  const onEditClick = useCallback((item: RoomAttributes) => {
    setSelectedRoom(item)
    setModeModal('edit')
    setOpenModal(true)
  }, [])

  const onDeleteClick = useCallback((item: RoomAttributes) => {
    setSelectedRoom(item)
    setOpenAlert(true)
  }, [])

  const onViewClick = useCallback((item: RoomAttributes) => {
    setSelectedRoom(item)
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
        loading={ !rooms || !rooms.length || loading }
        onAddClick={ onAddClick }
        onDeleteClick={ onDeleteClick }
        onEditClick={ onEditClick }
        onViewClick={ onViewClick }
        rows={ rooms }
      />

      <RoomModal
        mode={ modeModal }
        onClose={ onToggleModal }
        onSubmit={ onSubmit }
        open={ openModal }
        room={ selectedRoom }
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
