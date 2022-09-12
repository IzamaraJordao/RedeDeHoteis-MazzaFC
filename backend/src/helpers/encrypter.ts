import bcrypt from 'bcrypt'

export interface IEncrypter {
  encrypt(password: string): Promise<string>
  compare(password: string, hashedPassword: string): Promise<boolean>
}

class EncrypterBcrypt implements IEncrypter {
  async encrypt(password: string): Promise<string> {
    const SALT_ROUNDS = 15
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  }
  async compare(password: string, hashedPassword: string): Promise<boolean> {
    const isEqual = await bcrypt.compare(password, hashedPassword)
    return isEqual
  }
}
const encrypter = new EncrypterBcrypt()
export { encrypter }
