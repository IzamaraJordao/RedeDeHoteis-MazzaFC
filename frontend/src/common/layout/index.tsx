import { Button } from '@mui/material'
import router from 'next/router'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectName, selectToken, setAuth } from '../../store/authSlice'
import { AsideMenu } from '../components'

export function Layout({ children, header }): any {
  const name = useSelector(selectName)
  const token = useSelector(selectToken)
  // const firstRender = useRef(true)
  const dispatch = useDispatch()

  const GetAuth = () => {
    try {
      const token = localStorage.getItem('@token')
      const hotel = JSON.parse(localStorage.getItem('@hotel') as string)
      const user = JSON.parse(localStorage.getItem('@user') as string)
      if (token === undefined || token === null) {
        router.push('/')
       return
      }
      dispatch(setAuth({ token, hotel, user }))
    } catch (e) {
      console.log(e)
      if (token === undefined || token === null) {
        router.push('/')
      }
    }
  }
  // if (firstRender.current && typeof window !== 'undefined') {
  //   GetAuth()
  //   firstRender.current = false
    //não deixa a tela de home renderizar
    //return <></> 
  // }

 useEffect(() => {
    GetAuth()
  console.log(token)
    // firstRender.current = true
  }, [token])
 if (!token ) return <></> 

  return (
    <AsideMenu
      name={name as string}
      jobTitle="Gerente"
      header={header}
      isAdmin={true}
    >
      {children}
    </AsideMenu>
  )
}
