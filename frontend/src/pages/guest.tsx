import { Typography } from '@mui/material'
import React from 'react'
import { Layout } from '../common/layout'
import Guest from '../Guest/Guest'

// import Home from '../Home/home'

export default function home() {
  return (
    <div>
      <Layout header={<Typography>Hospedes</Typography>}>
        <Guest />
      </Layout>
    </div>
  )
}
