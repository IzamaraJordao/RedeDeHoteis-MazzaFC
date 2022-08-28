import React from 'react'
import { AsideMenu } from '../components'

export function Layout({ children }) {
  return (
    <div>
      <AsideMenu name="Matheus Barbosa" jobTitle="Gerente" />
      {children}
    </div>
  )
}
