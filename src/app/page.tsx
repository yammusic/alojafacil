import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import { Header } from '@/app/containers/header'
import { Footer } from '@/app/containers/footer'
import { SearchSection } from '@/app/containers/sections/search/SearchSection'
import { PopularSection } from '@/app/containers/sections/popular/PopularSection'
import { RecommendedSection } from '@/app/containers/sections/recommended/RecommendedSection'
import { BestPricesSection } from '@/app/containers/sections/best-prices/BestPricesSection'

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
