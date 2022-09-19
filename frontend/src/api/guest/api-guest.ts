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
    const response = await api.post('/guest', {
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
    });
    return response.data;
}

export async function getById(id: number) {
    return await api.get('/guest/' + id );
}
export async function getByCpf(cpf: string) {
    return await api.get('/guest/cpf' + cpf );
}
export async function remove(id: number) {
    return await api.delete('/guest/' + id);
}
export async function update(id: number) {
    return await api.put('/guest/' + id);
}
