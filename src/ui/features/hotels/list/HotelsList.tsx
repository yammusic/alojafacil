/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-multi-comp */
'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Box } from '@mui/material'
import type { GridColDef } from '@mui/x-data-grid'
import {
  DataGrid,
  GridActionsCellItem,
} from '@mui/x-data-grid'
import { MdEdit } from 'react-icons/md'

import { hotelsData, useHotelsActions } from '@/domain/providers/store'
import { fetchHotels } from '@/infra/services'
import defaultColumns from './columns'
import { Toolbar } from './Toolbar'
import { HotelForm } from '../form'
import { HotelModal } from '../modal'



export function HotelsList() {
  const [openModal, setOpenModal] = useState(false)
  const onToggleModal = useCallback((_: any, reason: string) => {
    if (reason !== 'backdropClick') {
      setOpenModal(!openModal)
    }
  }, [openModal])

  const { setHotels } = useHotelsActions()
  const hotels = hotelsData()

  const loadHotels = async() => {
    const { content: { data } } = await fetchHotels()
    setHotels(data as any)
  }

  useEffect(() => { loadHotels() }, [])

  const onAddClick = useCallback(() => {
    setOpenModal(true)
  }, [])

  const onEditClick = useCallback((id: number) => {
    // TODO
  }, [])

  const onDeleteClick = useCallback((id: number) => {
    // TODO
  }, [])

  const onExpandClick = useCallback((id: number) => {
    // TODO
  }, [])

  const columns: GridColDef[] = useMemo(() => [
    ...defaultColumns,
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={ <MdEdit /> }
          key={ `edit-${params.id}` }
          label="Edit"
        />,
      //   <GridActionsCellItem
      //     // icon={ <DeleteIcon /> }
      //     label="Eliminar"
      //     // onClick={ () => handleDeleteClick(params.id) }
      //   />,
      //   <GridActionsCellItem
      //     // icon={ <ExpandMoreIcon /> }
      //     label="Expandir"
      //     // onClick={ () => handleExpandClick(params.id) }
      //   />,
      ],
    },
  ], [])

  return (
    <Box>
      <DataGrid
        autoHeight
        checkboxSelection
        disableColumnFilter
        disableRowSelectionOnClick
        columns={ columns }
        initialState={ {
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        } }
        pageSizeOptions={ [15, 25, 50, 100] }
        rows={ hotels }
        slotProps={ {
          toolbar: {
            showQuickFilter: true,
            onAddClick,
          },
        } }
        slots={ { toolbar: Toolbar } }
        sx={ {
          border: 0,
        } }
      />

      <HotelModal onClose={ onToggleModal } open={ openModal } />
    </Box>
  )
}
