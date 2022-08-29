import { Typography } from '@mui/material'
import React from 'react'
import { CardHome } from '../common/components'
import { Layout } from '../common/layout'
import Home from '../Home/home'

export default function home() {
  return (
    <Layout header={<Typography>Funcionários</Typography>}>
      
      <Home />
    </Layout>
  )
}
