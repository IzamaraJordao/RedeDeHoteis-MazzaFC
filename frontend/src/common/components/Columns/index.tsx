// import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
// import { useState, useEffect } from 'react'
// // import { useNavigate } from 'react-router-dom'
// // import { DataProvider } from '../Register/type'
// // import { Table } from '../table/Table'

// import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
// import EditIcon from '@mui/icons-material/Edit'

// // import styles from './providerList.module.css'

// export default function ProviderList() {

//   const columns: GridColDef[] = [
//     { field: 'id', 
//     headerName: 'ID', 
//     width: 90, hide:true
  
//   },
//     {
//       field: 'name',
//       headerName: 'Nome',
//       width: 150,
//     },
//     {
//       field: 'name',
//       headerName: 'Nome Fantasia',
//       width: 170,
//     },
//     {
//       field: 'email',
//       headerName: 'E-mail',
//       sortable: false,
//       width: 150,
//     },
//     {
//       field: 'city',
//       headerName: 'Cidade',
//       type: 'string',
//       width: 150,
//     },
//     // {
//     //   field: 'actions',
//     //   headerName: 'Ações',
//     //   width: 150,
//     //   editable: false,
//     //   renderCell: (params: GridRenderCellParams<any, any, any>) => (
//     //     //criar nova tela para a edição das informações dos usuários
//     //     //criar modal confirmando ação (se usuário tiver certeza que quer deletar)
//     //     //criar para salvar no banco de dados
//     //     //fazer o input de pesquisa funcionar
//     //     <>
//     //       <button className={styles.btnDelete} onClick={() => {}}>
//     //         <DeleteForeverIcon />
//     //       </button>

//     //       <button
//     //         className={styles.btnEditar}
//     //         onClick={() => {
//     //           navigate(`/update/${params.id}`)
//     //         }}
//     //       >
//     //         <EditIcon />
//     //       </button>
//     //     </>
//     //   ),
//     // },
//   ]


//   const [page, setPage] = useState(1)
//   const [pageSize, setPageSize] = useState(4)
//   const [providers, setProviders] = useState<DataProvider[]>([])

//   async function listProvider() {
//     const { data } = await api.get('/provider/paginate', {
//       params: { page, pageSize },
//     })
//     setProviders(data.results)
//   }
//   useEffect(() => {
//     listProvider()
//   }, [])

//   return <Table data={providers} columns={columns} />
// }
