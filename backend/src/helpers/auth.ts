 import { UnauthorizedError } from "../exceptions/unauthorizedError";
import { tokenGenerator } from "./tokenGenerator";

export type DataToken = {
    exp: number,
    iat: number,
    user_id : string,
    hotel_id : string
}

export function Auth(token:string):DataToken{
    if(!token){
        throw new UnauthorizedError("Token not found")
    }
    if (token.includes('Bearer ')){
      console.log(token)
      try{
        return tokenGenerator.decode(token.split(' ')[1]) as DataToken
      }
      catch(error){
        throw new UnauthorizedError('Token inválido')
      }
    }else{
        throw new UnauthorizedError('Formato de token inválido')
    }
    

}
