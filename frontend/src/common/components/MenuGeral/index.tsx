import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Menu, MenuButton, IconSaida, HeaderMenu } from './styled'
import BoxHome from '../BoxHome';
import {
  AccountCircle as AccountCircleIcon,
  Bed as BedIcon,
  EventAvailable as EventAvailableIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
  PermContactCalendar as PermContactCalendarIcon,
  Person as PersonIcon,
} from '@mui/icons-material'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { If } from '../If';


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



export default function MiniDrawer(props: {
  children: React.ReactNode
  header: React.ReactNode | string
  name: string
  jobTitle: string
  isAdmin: boolean
}) {
  const router = useRouter();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Logout = () => {
    //@ts-ignore
    localStorage.clear()
    router.push('/')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
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
          <p>Matheus</p>
          {/* <p>{email}</p> */}
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
          {/* <If condition={props.isAdmin}>
            <InputAd />
          </If> */}
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
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>
        <BoxHome/>
        </Typography>
      </Box>
    </Box>
  );
}
