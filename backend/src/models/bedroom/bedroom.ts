import { Guest } from '../guest/guest';
import { uuid } from '../../helpers/uuid'



export type BedroomConstructor = {
  id?: string
  guest_id: Guest
  status: string
  tipo: string

}


export class Bedroom {
  id: string
  guest_id: Guest
  status: string
  tipo: string

 

  constructor(props: BedroomConstructor) {
    this.id = props.id || uuid()
    this.guest_id = props.guest_id
    this.status = props.status
    this.tipo = props.tipo
    

  }

  get publicInfo(){
    return{
      id : this.id ,
      guest_id : this.guest_id,
      status : this.status,
      tipo : this.tipo,
     

    }
  }
  get data() {
    return {
      id: this.id,
      guest_id: this.guest_id,
      status: this.status,
      tipo: this.tipo,
    }
  }
}
