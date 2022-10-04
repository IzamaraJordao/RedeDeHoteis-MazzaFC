import React, { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid';
import TableHeader from '../TableHeader';
import { omit } from 'ramda';
///GridColDef pode incluir uma função ou combinação para uma deternminada coluna

interface Props {
  data: GridRowsProp<any>
  columns: GridColDef[]
  search: (page: number, pageSize: number, filter?: object) => void
  isLoading: boolean // pagina sendo carregada
  page: number // pagina atual
  pageSize: number // tamanho da pagina
  total: number // total de registros
}

export default function Tabela(props: Props) {

  const [filter, setFilter] = useState<any>({});
  const [pageSize, setPageSize] = useState(props.pageSize);
  const [page, setPage] = useState(props.page);
  
  
  async function handleSearch(field: string, value: string) {
    if (value === '') {
      await setFilter((prevState: any) => { /// tratamento de erro, se o valor for vazio, o estado anterior é mantido
        return omit([field], prevState)
      })
      return
    }
    setFilter((filter: object) => ({
      ...filter,
      [field]: value,
    }))
  }

  useEffect(() => {
    props.search(1, pageSize, filter);
  }, [filter, pageSize])

  const columns = [
    ...props.columns.map((column) => ({
      ...column,
      sortable: false,
      renderHeader: () => (
        <TableHeader
          name={column.headerName}
          value={filter[column.field]}
          onSearch={(value: any) => handleSearch(column.field, value)}
        />
      )
    }))
  ]



  console.log(filter.name)
  return (
    <div style={{ height: 400, width: '1100px', color: '#222' }}>

      <DataGrid
        autoHeight
        rows={props.data}
        columns={columns}
        sx={{ backgroundColor: "#fff", }}
        // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 20, 30]}
        pagination
        keepNonExistentRowsSelected
        ////////// paginação
        rowCount={props.total}
        loading={props.isLoading}
        page={page}
        pageSize={pageSize}
        paginationMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}


      />
    </div>

  )
}
