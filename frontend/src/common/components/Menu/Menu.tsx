import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Menu, MenuButton } from './styles'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HomeIcon from '@mui/icons-material/Home'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'
import PersonIcon from '@mui/icons-material/Person'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import BedIcon from '@mui/icons-material/Bed'
import Link from 'next/link'

import { styles } from './styles'
import stylesCss from './menu.module.css'

type Props = {
  name: string
  jobTitle: string
}
export function AsideMenu(props: Props) {
  return (
    <aside className={stylesCss.header}>
      <div>
        <Box sx={styles.box}>
          <Menu>
            <h2>HOTEL INN REDE</h2>
            <AccountCircleIcon color="disabled" sx={{ fontSize: 140 }} />
            <p>{props.name}</p>
            <h3>{props.jobTitle}</h3>
          </Menu>

          <MenuButton
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <h3>MENU</h3>
            <Link href="/">
              <Button
                size="large"
                style={{ textAlign: 'left' }}
                startIcon={<HomeIcon />}
              >
                Home
              </Button>
            </Link>
            <Link href="/quartos">
              <Button size="large" startIcon={<BedIcon />}>
                Mapa Dos Quartos
              </Button>
            </Link>
            <Link href="/reservas">
              <Button size="large" startIcon={<EventAvailableIcon />}>
                Reserva
              </Button>
            </Link>
            <Link href="/hospedes">
              <Button size="large" startIcon={<PermContactCalendarIcon />}>
                Hopedes
              </Button>
            </Link>
            <Link href="/funcionarios">
              <Button size="large" startIcon={<PersonIcon />}>
                Funcionários
              </Button>
            </Link>
            <Link href="/administrativo">
              <Button size="large" startIcon={<LockOpenIcon />}>
                Administrativo
              </Button>
            </Link>
          </MenuButton>
        </Box>
      </div>
      <div></div>
    </aside>
  )
}
