import { PaginateParams } from './../../models/employees/index'
import { Employee, EmployeeRepository } from '../../models/employees'
import { Request, ReturnPaginate, UseCase } from '../interface'

export class PaginateEmployee
  implements
    UseCase<
      undefined,
      undefined,
      PaginateParams,
      ReturnPaginate<Employee['publicInfo']>
    >
{
  private readonly employeeRepository: EmployeeRepository
  constructor(employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository
  }
  async execute(params: Request<undefined, undefined, PaginateParams>) {
    let { page, pageSize, filter } = params.query
    page = Number (page) || 1  // se existr page, se não 1 (como se fosse um if ternario)
    pageSize = Number (pageSize) || 10 // se existir pageSize, se não 10
    filter = JSON.parse (filter as unknown as string || '{}')
    console.log(typeof filter)
    let filterSanitized = {}
    const keys = Object.keys(filter).filter((current, index) => {
      if (Employee.filter().includes(current as keyof Employee['publicInfo'])) {
        return true
      }
      return false
    })
    keys.forEach((current, index) => {
      if (typeof filter[current] === 'string') {
        // @ts-ignore
        filterSanitized[current] = filter[current]
        // @ts-ignore
          .toLowerCase()
          .replace(/[(),{}[]'"]/gi, '')
      }
      if (typeof filter[current] !== 'string') {
        // @ts-ignore
        filterSanitized[current] = filter[current]
      }
    })
    const employee = await this.employeeRepository.paginate({
      page,
      pageSize,
      filter,
    }) as Employee[]
    const total = await this.employeeRepository.paginate({
      page,
      pageSize: 0,
      filter,
    }) as number
    return {
      status: 200,
      body: {
        result: employee.map((current, index) => current.publicInfo),
        current: page,
        pageSize,
        total: total,
      },
    }
  }
}
