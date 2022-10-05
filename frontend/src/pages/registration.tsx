import React from 'react'
import { Layout } from '../common/layout'
import Registration from '../Registration'
import  Header from '../common/components/Header'

// import Home from '../Home/home'

export default function registration() {
  const header = () => {return <Header title="Cadastrar hotel"/>}
  return (
    <div>
      <Layout header={header()}>
        <Registration />
      </Layout>
    </div>
  )
}
