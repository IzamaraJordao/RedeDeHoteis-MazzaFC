import { TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { TableHeader } from './styled'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/router'


export default function tableHeader(props: any) {
  const [inputValue, setInputValue] = React.useState('')
  const router = useRouter()
 
 


  useEffect(() => {
    if (props.value) setInputValue(props.value)
  }, [props.value])

  return (
    <TableHeader>
      <h4>{props.name}</h4>

      <div>
        <input
          value={inputValue}
          onChange={({ target }) => {
            setInputValue(target.value)
          }}
        />
      
        <button
          onClick={() => {
            if (props.onSearch) props.onSearch(inputValue)
          }}
        >
          <SearchIcon sx={{ fontSize: 10 }} />
        </button>
      </div>
    </TableHeader>
  )
}

//
