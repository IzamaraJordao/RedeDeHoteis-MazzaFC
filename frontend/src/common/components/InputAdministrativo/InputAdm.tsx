import React, { useState } from 'react'
import Button from '@mui/material/Button';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ApartmentIcon from '@mui/icons-material/Apartment';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import { useRouter } from 'next/router';



export default function InputAdm() {

  const [buttonVisible, setButtonVisible] = useState(false);
  const router = useRouter();

  function handleButton() {
    if (buttonVisible === false) {
      setButtonVisible(true)
    } else {
      setButtonVisible(false)
    }
  }

  const handleButtonVisible = () => {
    return (
      <div>
        <Button size="large" 
        startIcon={<ApartmentIcon />}
        onClick={() => router.push('/registration')}
        >Cadastro Hotel</Button>
        <Button 
          size="large" 
          startIcon={<NightShelterIcon />}
          onClick={() => router.push('/map')}  
        >Cadastro quartos</Button>
      </div>
    )
  }

  return (
    <div>
      <div>
        <Button size="large"
          startIcon={<LockOpenIcon />}
          onClick={() => handleButton()}
          endIcon={<KeyboardArrowDownIcon />}

        >Administrativo</Button>
      </div>
      {buttonVisible && handleButtonVisible()}
    </div>
  )
}
