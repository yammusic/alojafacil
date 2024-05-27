'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Box } from '@mui/material'

import { DataGrid } from '@/app/containers'
import { appSessions, useAppActions } from '@/domain/providers/store'
import { fetchSessions } from '@/infra/services'

import columns from './columns'

export function SessionsList() {
  const [loading, setLoading] = useState(false)
  const { setSessions } = useAppActions()
  const sessions = appSessions()

  const loadSessions = useCallback(async() => {
    const { content: { data } } = await fetchSessions()
    setSessions(data as any)
    setLoading(false)
  }, [])

  useEffect(() => { loadSessions() }, [])

  return (
    <Box>
      <DataGrid
        disableRowSelectionOnClick
        columns={ columns }
        loading={ !sessions || !sessions.length || loading }
        rows={ sessions }
      />
    </Box>
  )
}
