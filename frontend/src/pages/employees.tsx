import { Typography } from '@mui/material'
import React from 'react'
import { Layout } from '../common/layout'
import Funcionario from '../Employees/Employees'
import  Header from '../common/components/Header'



export default function employee() {
  const header = () => {return <Header title="Funcionários" />}
  return (
    <div>
      <Layout header={header()}>
        <Funcionario />
      </Layout>
    </div>
  )
}
