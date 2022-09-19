import { Typography } from '@mui/material'
import React from 'react'
import { Layout } from '../common/layout'
import Funcionario from '../Employees/Employees'

// import Home from '../Home/home'

export default function home() {
  return (
    <div>
      <Layout header={<Typography>Funcionários</Typography>}>
        <Funcionario />
      </Layout>
    </div>
  )
}
