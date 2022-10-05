import { unstable_deprecatedPropType } from '@mui/utils'
import router from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectName, selectToken, setAuth } from '../../store/authSlice'
import { AsideMenu } from '../components'

export function Layout({ children, header }) {
  const name = useSelector(selectName)
  const token = useSelector(selectToken)
  const dispatch = useDispatch()

  const GetAuth = () => {
    try{
      const token = localStorage.getItem('@token')
      const hotel = JSON.parse(localStorage.getItem('@hotel') as string)
     const user = JSON.parse(localStorage.getItem('@user') as string)
     dispatch(setAuth({token, hotel, user}))
    }
    catch(e){
      console.log(e)
      return
    }
  
    
  }
  useEffect(() => {
    GetAuth()

  }, [])


  if(token === undefined){
   return( router.push('/login'))

  }


  return (
      <AsideMenu name={name as string} jobTitle="Gerente" header={header} >
      {children}
      </AsideMenu>
    
  )
  

// fazer um if que vai pegar o token , vai bater na rota de validação  e se tiver ok vai mostrar o layout se não vai mostrar o login


}