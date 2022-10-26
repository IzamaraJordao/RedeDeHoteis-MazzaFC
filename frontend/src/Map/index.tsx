import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, MenuItem, Select } from "@mui/material";
import { BoxDiv, BoxExternal, InputNomeModal } from './styled';
import { Hotel } from "../store/hotelSlice";
import { useForm } from "react-hook-form";




export default function bancoTabela() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hotels, setHotels] = React.useState<Pick<Hotel, 'id' | 'name'>[]>([])

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Hotel>()

  
  useEffect(() => {
    axios.get('http://localhost:3030/hotel').then((res) => {
      setHotels(res.data.id)
    })
  }, [])

  const onSubmit = (data: Hotel) => {

  }


  function handleChange(e) {
    setValue('id', e.target.value)
  }

  return (
    <div>
      <div>

      <BoxExternal>
        <BoxDiv>
          <div>
            <Button variant="contained" onClick={() => setIsModalVisible(true)} >NOVO CADASTRO</Button>
          </div>

          <div>
                <InputNomeModal>
                  <label>Hotel</label>
                  <Select
                  sx={{ width: '200px' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="hotel"
                    {...register('id')}
                    onChange={handleChange}
                  >
                    <MenuItem value="" selected sx={{ width: '250px' }}>
                      Selecione...
                    </MenuItem>
                    {hotels.map((hotel) => (
                      <MenuItem value={hotel.id}>{hotel.name}</MenuItem>
                    ))}
                  </Select>
                </InputNomeModal>
              </div>
          
        </BoxDiv>
      </BoxExternal>

      </div>
      {/* {isModalVisible ? <Modal onClose={() => setIsModalVisible(false)} /> : null} */}
    </div>
  )
}
