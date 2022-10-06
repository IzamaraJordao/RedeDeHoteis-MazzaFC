import React from 'react'
import { Menu, MenuButton, IconSaida, HeaderMenu } from './styled'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectEmail } from '../../../store/authSlice'
import InputAd from '../InputAdministrativo/InputAdm'
import { Box, Button } from '@mui/material'
import {
  AccountCircle as AccountCircleIcon,
  Bed as BedIcon,
  EventAvailable as EventAvailableIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
  PermContactCalendar as PermContactCalendarIcon,
  Person as PersonIcon,
} from '@mui/icons-material'
import { If } from '../If'

export function AsideMenu(props: {
  children: React.ReactNode
  header: React.ReactNode | string
  name: string
  jobTitle: string
  isAdmin: boolean
}) {
  const router = useRouter()
  const email = useSelector(selectEmail)

  const Logout = () => {
    //@ts-ignore
    localStorage.clear()
    router.push('/')

  }

  return (
    <div style={{ display: 'flex', backgroundColor: '#EEE9E9' }}>
      <Box
        sx={{
          width: 250,
          height: '100vh',
          backgroundColor: '#f5f5f5',

          '@media (max-width: 1435px)': {
            width: 200,
          },
          '@media (max-width: 1330px)': {
            width: 175,
          },

          '@media (max-width: 1230px)': {
            width: 150,

            // margin:0
          },
          '@media (max-width: 1030px)': {
            width: 100,
          },
        }}
      >
        <Menu>
          <h2>HOTEL INN REDE</h2>
          <AccountCircleIcon color="disabled" sx={{ fontSize: 140 }} />
          <p>{email}</p>
          <h3>{props.jobTitle}</h3>
        </Menu>
        <MenuButton>
          <h3>MENU</h3>
          <Button
            size="large"
            onClick={() => {
              router.push('/home')
            }}
            style={{ textAlign: 'left' }}
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
          <Button size="large" startIcon={<BedIcon />}>
            Mapa Dos Quartos
          </Button>
          <Button
            size="large"
            onClick={() => {
              router.push('/reservation')
            }}
            startIcon={<EventAvailableIcon />}
          >
            Reserva
          </Button>
          <Button
            size="large"
            onClick={() => {
              router.push('/guest')
            }}
            startIcon={<PermContactCalendarIcon />}
          >
            Hopedes
          </Button>
          <Button
            size="large"
            onClick={() => {
              router.push('/employees')
            }}
            startIcon={<PersonIcon />}
          >
            Funcionários
          </Button>
          <If condition={props.isAdmin}>
            <InputAd />
          </If>
        </MenuButton>
      </Box>

      <div>
        <HeaderMenu>
          <IconSaida>
            <div>
              <Button onClick={Logout}>
                {' '}
                <LogoutIcon
                  sx={{ fontSize: 30, color: '#fff', marginTop: 2 }}
                />
              </Button>
            </div>
          </IconSaida>
        </HeaderMenu>
        {props.header}
        <main>{props.children}</main>
      </div>
    </div>
  )
}
