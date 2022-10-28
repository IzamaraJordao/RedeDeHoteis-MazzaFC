import { Typography } from '@mui/material'
import React from 'react'
import { Layout } from '../common/layout'
import Guest from '../Guest/GuestNew'
import  Header from '../common/components/Header'



export default function guest() {
  const header = () => {return <Header title="Hóspedes"/>}
  return (
    <div>
      <Layout header={header()}>
        <Guest />
      </Layout>
    </div>
  )
}
