import  axios  from 'axios';

export async function saveHotel({
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

export async function getByIdHotel(id: number) {
    return await axios.get('/hotel/' + id );
}
export async function getByCnpjHotel(cnpj: string) {
    return await axios.get('/hotel/cnpj' + cnpj );
}

export async function paginateHotel() {
    return await axios.get('/hotel');
}
export async function removeHotel(id: number) {
    return await axios.delete('/hotel/' + id);
}
export async function updateHotel(id: number) {
    return await axios.put('/hotel/' + id);
}
