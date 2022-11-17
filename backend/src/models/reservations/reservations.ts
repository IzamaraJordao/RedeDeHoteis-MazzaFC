import { Guest } from './../guest/guest';

import { uuid } from '../../helpers/uuid'



export type ReservationsConstructor = {
  id: string
  check_in: Date
  check_out: Date
  check_in_static: Date
  check_out_static: Date
  guests: Guest[]
  bedroom_id: string


}


export class Reservations {
  id: string
  check_in: Date
  check_out: Date
  check_in_static: Date
  check_out_static: Date
  guests: Guest[]
  bedroom_id: string
 
 

  constructor(props: ReservationsConstructor) {
    this.id = props.id || uuid()
    this.check_in = props.check_in
    this.check_out = props.check_out
    this.check_in_static = props.check_in_static
    this.check_out_static = props.check_out_static
    this.guests = props.guests
    this.bedroom_id = props.bedroom_id
  }

  get publicInfo(){
    return{
      id : this.id ,
      check_in: this.check_in,
      check_out: this.check_out,
      check_in_static: this.check_in_static,
      check_out_static:this.check_out_static,
      guests: this.guests,
      bedroom_id: this.bedroom_id,
  
     

    }
  }
  get data() {
    return {
      id: this.id,
      check_in: this.check_in,
      check_out: this.check_out,
      check_in_static: this.check_in_static,
      check_out_static:this.check_out_static,
      guests: this.guests.map(guest => guest.data),
      bedroom_id: this.bedroom_id,

    }
  }
  static filter() {
    return ['id', 'check_in', 'check_out' ]
  }

}
