import { handleRequest } from "../handleRequest";
import {ProviderContext} from 'notistack';

export async function createSession(
    email: any,
    password: any,
    enqueueSnackbar: ProviderContext['enqueueSnackbar']
){
    return await handleRequest({
        method: "post",
        url: '/login',
        data: { email, password }
    }, enqueueSnackbar);

};
