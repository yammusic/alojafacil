import React from 'react'
import { Grid } from '@mui/material'
import { PopularSection, RecommendedSection, SearchSection } from '@/app/containers'

export default function Home() {
  return (
    <Grid container direction="column">
      <SearchSection />

      <PopularSection />

      <RecommendedSection />
    </Grid>
  )
}
