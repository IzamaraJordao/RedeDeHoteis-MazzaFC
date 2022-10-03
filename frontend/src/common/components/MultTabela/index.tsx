import React, { useEffect, useState } from "react";



import { DataGrid, GridRowsProp, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid';
///GridColDef pode incluir uma função ou combinação para uma deternminada coluna





export default function Tabela({ banco , columns}) {

  const [pageSize, setPageSize] = useState(10);
  console.log(pageSize)
  return (
        <div style={{ height: 350, width: '65vw', color: '#222'}}>

          <DataGrid rows={banco} columns={columns} 
          sx={{backgroundColor: "#fff",}}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 30]}
          pagination
          
          />
        </div>
     
  )
}
