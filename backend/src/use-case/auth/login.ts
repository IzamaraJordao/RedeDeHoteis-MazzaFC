import { HttpError } from './../../exceptions/httpError'

import { EmployeeRepository } from '../../models/employees'
import { IEncrypter } from '../../helpers/encrypter'

import { Request, Response } from '../interface'
import { ITokenGenerator } from '../../helpers/tokenGenerator'
import { HotelRepository } from '../../models/hotel'
import { Address } from '../../models/address'

type LoginRequest = {
  email: string
  password: string
}

type LoginResponse = {
  user: {
    name: string
    email: string
  }
  hotel: {
    cnpj: number
    name: string
    address: Address
    phone: string
    email: string
  }
  is_first_access: boolean
  token: string
}

export class Login {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly hotelRepository: HotelRepository,
    private readonly encrypter: IEncrypter,
    private readonly tokenGenerator: ITokenGenerator,
  ) {}
  async execute(params: Request<LoginRequest>): Response<LoginResponse> {
    const { email, password } = params.body
    const employeeFounded = await this.employeeRepository.findByEmail(email)
    if (!employeeFounded) {
      throw new HttpError('Usuário/senha incorretos', 400)
    }

    const passwordIsValid = await this.encrypter.compare(
      password,
      employeeFounded.password,
    )
    if (!passwordIsValid) {
      throw new HttpError('Usuário/senha incorretos', 400)
    }
    if (!employeeFounded.hotel) {
      throw new HttpError('Usuário inativo', 400)
    }

    const hotel = await this.hotelRepository.findById(employeeFounded.hotel)
    const token = this.tokenGenerator.encode({
      id_user: employeeFounded.id,
      id_hotel: employeeFounded.hotel,
    })

    return {
      body: {
        user: employeeFounded.loginInfo,
        hotel: hotel.loginInfo,
        is_first_access: employeeFounded.is_first_access,
        token,
      },
      status: 201,
    }
  }
}
