import { Guest } from '../guest/guest';
import { Bedroom } from '../bedroom/bedroom';
import { uuid } from '../../helpers/uuid'



export type ReservationsConstructor = {
  id?: string
  guest_consumption: string
  check_in: Date
  check_out: Date
  guest: Guest
  bedroom: Bedroom


}


export class Reservations {
  id: string
 guest_consumption: string
  check_in: Date
  check_out: Date
  guest: Guest
  bedroom: Bedroom
 

  constructor(props: ReservationsConstructor) {
    this.id = props.id || uuid()
    this.guest_consumption = props.guest_consumption
    this.check_in = props.check_in
    this.check_out = props.check_out
    this.guest = props.guest
    this.bedroom = props.bedroom
    

  }

  get publicInfo(){
    return{
      id : this.id ,
      guest_consumption: this.guest_consumption,
      check_in: this.check_in,
      check_out: this.check_out,
      guest: this.guest,
      bedroom: this.bedroom,
     

    }
  }
  get data() {
    return {
      id: this.id,
      guest_consumption: this.guest_consumption,
      check_in: this.check_in,
      check_out: this.check_out,
      guest: this.guest,
      bedroom: this.bedroom,

    }
  }
  static filter() {
    return ['id', 'guest_consumption', 'check_in', 'check_out', 'guest', 'bedroom']
  }

}
