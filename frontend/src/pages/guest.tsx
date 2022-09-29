import { Typography } from '@mui/material'
import React from 'react'
import { Layout } from '../common/layout'
import Guest from '../Guest/Guest'
import  Header from '../common/components/Header'


// import Home from '../Home/home'

export default function guest() {
  const header = () => {return <Header title="Hospedes"/>}
  return (
    <div>
      <Layout header={header()}>
        <Guest />
      </Layout>
    </div>
  )
}
