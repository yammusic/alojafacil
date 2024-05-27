'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Box, Snackbar } from '@mui/material'

import { DeleteAlert } from '@/app/components'
import { DataGrid } from '@/app/containers'
import { appRoles, useAppActions } from '@/domain/providers/store'
import type { RoleAttributes } from '@/domain/db/features/Role/types'
import type { RoleResponse } from '@/infra/services'
import {
  createRole,
  deleteRole,
  fetchRoles,
  updateRole,
} from '@/infra/services'

import columns from './columns'
import { RoleModal } from '../modal'

export function RolesList() {
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [modeModal, setModeModal] = useState<'view' | 'edit' | 'add'>('add')
  const [selectedRole, setSelectedRole] = useState<RoleAttributes | null>(null)
  const { setRoles } = useAppActions()
  const roles = appRoles()

  const loadRoles = useCallback(async() => {
    const { content: { data } } = await fetchRoles()
    setRoles(data as any)
    setLoading(false)
  }, [])

  useEffect(() => { loadRoles() }, [])

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
    if (!selectedRole) return
    setOpenAlert(false)
    setLoading(true)

    const { content: { message } } = await deleteRole(selectedRole.id)
    setNotification(message)
    setOpenSnackbar(true)

    await loadRoles()
  }, [selectedRole])

  const onSubmit = useCallback(async (data: RoleAttributes) => {
    setOpenModal(false)
    setLoading(true)
    let response: RoleResponse

    try {
      if (modeModal === 'edit') {
        response = await updateRole(data)
      } else if (modeModal === 'add') {
        response = await createRole(data)
      } else { return }

      setNotification(response?.content?.message)
      setOpenSnackbar(true)

      await loadRoles()
    } catch (error: any) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [selectedRole, modeModal])

  const onAddClick = useCallback(() => {
    setSelectedRole(null)
    setModeModal('add')
    setOpenModal(true)
  }, [])

  const onEditClick = useCallback((item: RoleAttributes) => {
    setSelectedRole(item)
    setModeModal('edit')
    setOpenModal(true)
  }, [])

  const onDeleteClick = useCallback((item: RoleAttributes) => {
    setSelectedRole(item)
    setOpenAlert(true)
  }, [])

  const onViewClick = useCallback((item: RoleAttributes) => {
    setSelectedRole(item)
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
        loading={ !roles || !roles.length || loading }
        onAddClick={ onAddClick }
        onDeleteClick={ onDeleteClick }
        onEditClick={ onEditClick }
        onViewClick={ onViewClick }
        rows={ roles }
      />

      <RoleModal
        mode={ modeModal }
        onClose={ onToggleModal }
        onSubmit={ onSubmit }
        open={ openModal }
        role={ selectedRole }
      />

      <DeleteAlert
        message="Are you sure you want to delete this role?"
        onClose={ onCloseAlert }
        onConfirm={ onConfirmDelete }
        open={ openAlert }
        title="Delete Role"
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
