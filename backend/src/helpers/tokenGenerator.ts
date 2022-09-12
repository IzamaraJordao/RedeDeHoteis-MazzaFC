import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import jwt, { JwtPayload } from 'jsonwebtoken'

dotenv.config()

export interface ITokenGenerator {
  encode(toEncode: object): string
  decode(toDecode: string): object
}

class TokenGeneratorJWT implements ITokenGenerator {
  privateKey: string
  constructor() {
    this.privateKey = process.env.API_KEY as string
    if (!this.privateKey) {
      throw new Error('Chave de api não definida')
    }
  }
  encode(toEncode: object): string {
    return jwt.sign(toEncode, this.privateKey, { expiresIn: '2h' })
  }
  decode(toDecode: string): object {
    return jwt.verify(toDecode, this.privateKey) as JwtPayload
  }
}

const tokenGenerator = new TokenGeneratorJWT()
export { tokenGenerator }
