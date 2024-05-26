'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Box, Alert, Snackbar } from '@mui/material'

import { DataGrid } from '@/app/containers'
import { DeleteAlert } from '@/app/components'
import { appUsers, useAppActions } from '@/domain/providers/store'
import type { User } from '@/domain/db/features/User/model'
import type { UserAttributes } from '@/domain/db/features/User/types'
import type { UserResponse } from '@/infra/services'
import {
  createUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from '@/infra/services'

import columns from './columns'
import { UserModal } from '../modal'

export function UsersList() {
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [modeModal, setModeModal] = useState<'view' | 'edit' | 'add'>('add')
  const [selectedUser, setSelectedUser] = useState<UserAttributes | null>()
  const { setUsers } = useAppActions()
  const users = appUsers()

  const loadUsers = useCallback(async() => {
    const { content: { data } } = await fetchUsers()
    setUsers(data as any)
    setLoading(false)
  }, [])

  useEffect(() => { loadUsers() }, [])

  const onToggleModal = useCallback((_: any, reason: string) => {
    if (reason !== 'backdropClick') {
      setOpenModal(!openModal)
    }
  }, [openModal])

  const onCloseSnackbar = useCallback(() => {
    setOpenSnackbar(false)
    setNotification('')
  }, [])

  const onCloseAlert = useCallback(() => {
    setOpenAlert(false)
  }, [])

  const onConfirmDelete = useCallback(async () => {
    if (!selectedUser) return
    setOpenAlert(false)
    setLoading(true)

    const { content: { message } } = await deleteUser(selectedUser.id)
    setNotification(message)
    setOpenSnackbar(true)

    await loadUsers()
  }, [selectedUser])

  const onSubmit = useCallback(async (data: User) => {
    setOpenModal(false)
    setLoading(true)
    let response: UserResponse
    console.info({ data, modeModal })

    try {
      if (modeModal === 'edit') {
        response = await updateUser(data)
      } else if (modeModal === 'add') {
        response = await createUser(data)
      } else { return }

      setNotification(response?.content?.message)
      setOpenSnackbar(true)

      await loadUsers()
    } catch (error: any) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [selectedUser, modeModal])

  const onAddClick = useCallback(() => {
    setSelectedUser(null)
    setModeModal('add')
    setOpenModal(true)
  }, [])

  const onEditClick = useCallback((item: UserAttributes) => {
    setSelectedUser(item)
    setModeModal('edit')
    setOpenModal(true)
  }, [])

  const onDeleteClick = useCallback((item: UserAttributes) => {
    setSelectedUser(item)
    setOpenAlert(true)
  }, [])

  const onViewClick = useCallback((item: UserAttributes) => {
    setSelectedUser(item)
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
        loading={ !users || !users.length || loading }
        onAddClick={ onAddClick }
        onDeleteClick={ onDeleteClick }
        onEditClick={ onEditClick }
        onViewClick={ onViewClick }
        rows={ users }
      />

      <UserModal
        mode={ modeModal }
        onClose={ onToggleModal }
        onSubmit={ onSubmit }
        open={ openModal }
        user={ selectedUser as any }
      />

      <DeleteAlert
        message="Are you sure you want to delete this user?"
        onClose={ onCloseAlert }
        onConfirm={ onConfirmDelete }
        open={ openAlert }
        title="Delete User"
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
