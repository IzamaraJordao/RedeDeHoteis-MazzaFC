import { Bedroom } from '../bedroom/bedroom';
import { uuid } from '../../helpers/uuid'



export type ReservationsConstructor = {
  id?: string
  check_in: Date
  check_out: Date
  check_in_static: Date
  check_out_static: Date
  bedroom: Bedroom


}


export class Reservations {
  id: string
  check_in: Date
  check_out: Date
  check_in_static: Date
  check_out_static: Date
  bedroom: Bedroom
 

  constructor(props: ReservationsConstructor) {
    this.id = props.id || uuid()
    this.check_in = props.check_in
    this.check_out = props.check_out
    this.check_in_static = props.check_in_static
    this.check_out_static = props.check_out_static
    this.bedroom = props.bedroom
    

  }

  get publicInfo(){
    return{
      id : this.id ,
      check_in: this.check_in,
      check_out: this.check_out,
      check_in_static: this.check_in_static,
      check_out_static:this.check_out_static,
      bedroom: this.bedroom,
     

    }
  }
  get data() {
    return {
      id: this.id,
      check_in: this.check_in,
      check_out: this.check_out,
      check_in_static: this.check_in_static,
      check_out_static:this.check_out_static,
      bedroom: this.bedroom,

    }
  }
  static filter() {
    return ['id', 'check_in', 'check_out', 'bedroom']
  }

}
