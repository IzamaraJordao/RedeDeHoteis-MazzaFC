import React from 'react'
import { ButtonProps } from './types'

export function ButtonC({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props} />
  )
}





        

    
