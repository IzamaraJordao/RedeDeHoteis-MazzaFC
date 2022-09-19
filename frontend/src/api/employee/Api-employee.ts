import api from 'axios'

export async function save({
  id,
  name,
  rg,
  cpf,
  email,
  phone,
  address,
  note,
  active,
  password,
  hotel,
  is_first_access,
}: any) {
  const response = await api.post('/employees', {
    id,
    name,
    rg,
    cpf,
    email,
    phone,
    address,
    note,
    active,
    password,
    hotel,
    is_first_access,
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
