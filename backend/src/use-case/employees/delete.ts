import { EmployeeRepository} from '../../Models/employees'
import { Request } from '../interface'

export class DeleteEmployee {
  constructor(private readonly employeeRepository: EmployeeRepository) {}
  async execute(params: Request<undefined,{id:string}>) {
    const {id} = params.params
    
    await this.employeeRepository.delete(id)
    
  }


}
