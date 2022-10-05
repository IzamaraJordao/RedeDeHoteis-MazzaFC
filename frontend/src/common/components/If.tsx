import React from 'react'

type Props = {
  children: React.ReactNode
  condition: boolean
}

export function If({children, condition}: Props) {
  if  (condition) {
    return <>{children}</>
  }
  return <></>
}
