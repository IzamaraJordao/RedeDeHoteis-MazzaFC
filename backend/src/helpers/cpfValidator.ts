import { cpf } from 'cpf-cnpj-validator';

export function cpfValidator(cpfValidate:string) : boolean {
  return cpf.isValid(cpfValidate);
}
//
