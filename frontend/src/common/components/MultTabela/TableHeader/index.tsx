import { TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { TableHeade } from './styled'
import SearchIcon from '@mui/icons-material/Search'

export default function tableHeader(props: any) {
  const [inputValue, setInputValue] = React.useState('')

  useEffect(() => {
    if (props.value) setInputValue(props.value)
  }, [props.value])

  function handleAction() {
    if (props.name === 'Ações') {
      return null
    } else
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
  }

  return (
    <TableHeade>
      <strong>{props.name}</strong>
      {handleAction()}
    </TableHeade>
  )
}

//
