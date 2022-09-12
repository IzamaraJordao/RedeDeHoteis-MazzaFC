import React from 'react'
import { CardHome } from '../common/components'
import { Layout } from '../common/layout'
import Home from '../Home/home'

export default function home() {
  return (
    <Layout header={<CardHome />}>
      
      <Home />
    </Layout>
  )
}
