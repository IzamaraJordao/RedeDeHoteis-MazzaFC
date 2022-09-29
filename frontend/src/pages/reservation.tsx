import { Typography } from '@mui/material'
import React from 'react'
import { Layout } from '../common/layout'
import Reservation from '../Reservation'
import  Header from '../common/components/Header'


// import Home from '../Home/home'

export default function reservation() {
  const header = () => {return <Header title="Reserva"/>}
  return (
    <div>
      <Layout header={header()}>
        <Reservation />
      </Layout>
    </div>
  )
}
