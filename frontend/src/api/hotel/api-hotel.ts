import  axios  from 'axios';

export async function save({
    id,
    name,
    cnpj,
    address,
    phone,
    email}: any) {
    const response = await axios.post('/hotel', {
        id,
        cnpj,
        name,
        address,
        phone,
        email,
    });
    return response.data;
}

export async function getById(id: number) {
    return await axios.get('/hotel/' + id );
}
export async function getByCnpj(cnpj: string) {
    return await axios.get('/hotel/cnpj' + cnpj );
}

export async function paginate() {
    return await axios.get('/hotel');
}
export async function remove(id: number) {
    return await axios.delete('/hotel/' + id);
}
export async function update(id: number) {
    return await axios.put('/hotel/' + id);
}
