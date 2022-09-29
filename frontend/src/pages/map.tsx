import React from 'react'
import { Layout } from '../common/layout'
import Map from '../Map'
import  Header from '../common/components/Header'

// import Home from '../Home/home'

export default function map() {
  const header = () => {return <Header title="Cadastrar quarto"/>}
  return (
    <div>
      <Layout header={header()}>
        <Map />
      </Layout>
    </div>
  )
}
