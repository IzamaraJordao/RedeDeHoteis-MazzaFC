import React from 'react'
import { AsideMenu, Card } from '../common/components'
import Tabela from '../components/Tabela/Tabela'

export default function home() {
  return (
    <div>
      <AsideMenu name={''} jobTitle={''} />
      <Card />
      <Tabela />
    </div>
  )
}
