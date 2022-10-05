import api from 'axios'

export async function save({
  name,
  rg,
  cpf,
  email,
  phone,
  address,
  note,
  password,
}: any) {
  const response = await api.post('/employees', {
    name,
    rg,
    cpf,
    email,
    phone,
    address,
    note,
    password,

  })
  return response.data
}

export async function get(id: number) {
  return await api.get('/employee/' + id)
}
export async function paginate() {
  return await api.get('/employee')
}
export async function remove(id: number) {
  return await api.delete('/employee/' + id)
}
export async function update(id: number) {
  return await api.put('/employee/' + id)
}
