import { Typography } from '@mui/material'
import React from 'react'
import { Layout } from '../common/layout'
import Registration from '../Registration/Registration'

// import Home from '../Home/home'

export default function home() {
  return (
    <div>
      <Layout header={<Typography>Funcionários</Typography>}>
        <Registration />
      </Layout>
    </div>
  )
}
