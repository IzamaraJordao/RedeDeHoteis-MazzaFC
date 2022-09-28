import { Guest } from '../guest/guest';
import { uuid } from '../../helpers/uuid'



export type BedroomConstructor = {
  id?: string
  guest: Guest
  status: string
  tipo: string

}


export class Bedroom {
  id: string
  guest: Guest
  status: string
  tipo: string

 

  constructor(props: BedroomConstructor) {
    this.id = props.id || uuid()
    this.guest = props.guest
    this.status = props.status
    this.tipo = props.tipo
    

  }

  get publicInfo(){
    return{
      id : this.id ,
      guest : this.guest,
      status : this.status,
      tipo : this.tipo,
     

    }
  }
  get data() {
    return {
      id: this.id,
      guest: this.guest,
      status: this.status,
      tipo: this.tipo,
    }
  }
  static filter() {
    return ['id', 'guest', 'status', 'tipo']
  }

}
