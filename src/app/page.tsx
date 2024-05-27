import React from 'react'
import { Box, Grid } from '@mui/material'
import {
  PopularSection,
  RecommendedSection,
  SearchSection,
  Header,
  Footer,
  BestPricesSection,
} from '@/app/containers'

export default function Home() {
  return (
    <>
      <Header />

      <Box component="main" mt={ 8 }>
        <Grid container direction="column">
          <SearchSection />

          <PopularSection />

          <RecommendedSection />

          <BestPricesSection />
        </Grid>
      </Box>

      <Footer />
    </>
  )
}
