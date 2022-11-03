import { ValidationError } from '../../exceptions/validationError'
import { uuid } from '../../helpers/uuid'
import { Reservations } from '../reservations'


export type ScheduleConstructor = {
  id?: string
  data_initial: string
  bedroom: string
  reservation_id: string | null
  
}

export class Schedule {
  id: string
 data_initial: string
  bedroom: string
  reservation_id: string
  reservation?: Reservations 


  constructor(props: ScheduleConstructor) {
    this.id = props.id || uuid()
    if(!props.data_initial){
      throw new ValidationError('Data inicial não pode ser vazia')
    }
      this.data_initial =  props.data_initial
    if(!props.bedroom){
      throw new ValidationError('Quarto não pode ser vazio')
    }
    this.bedroom = props.bedroom
    if(!props.reservation_id){
      throw new ValidationError('Reserva não pode ser vazia')
    }
    this.reservation_id = props.reservation_id
  }

  get publicInfo() {
    return {
      id: this.id,
      data_initial: this.data_initial,
      bedroom: this.bedroom,
      reservation_id: this.reservation_id,
      reservation: this.reservation

  }
}
  /**
   * Retorna todos os parametros em formato json
   */
  get data() {
    return {
      id: this.id,
      data_initial: this.data_initial,
      bedroom: this.bedroom,
      reservation_id: this.reservation_id,
      reservation: this.reservation

    }
  }

  static filter(): Array<keyof Schedule> {
    return ['id', 'data_initial', 'bedroom', 'reservation_id']
  }

}
