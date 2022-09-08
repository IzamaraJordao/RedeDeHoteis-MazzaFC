import { Typography } from '@mui/material'
import React from 'react'
import { Layout } from '../common/layout'
import MapHotel from '../Map/Map'

// import Home from '../Home/home'

export default function home() {
  return (
    <div>
      <Layout header={<Typography>Funcionários</Typography>}>
        <MapHotel />
      </Layout>
    </div>
  )
}
