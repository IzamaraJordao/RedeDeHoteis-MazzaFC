import React from 'react'
import { AsideMenu } from '../components'

export function Layout({ children, header }) {
  return (
      <AsideMenu name="Matheus Barbosa" jobTitle="Gerente" header={header} >
      {children}
      </AsideMenu>
  )
}
