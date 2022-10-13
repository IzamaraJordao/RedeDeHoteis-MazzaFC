import { Guest } from '../guest/guest';
import { uuid } from '../../helpers/uuid'



export type BedroomConstructor = {
  id?: string
  guest: Guest
  status: string
  room_types: string
  hotel_id: string
  position_X: string
  position_Y: string


}


export class Bedroom {
  id: string
  guest: Guest
  status: string
  room_types: string
  hotel_id: string
  position_X: string
  position_Y: string

 

  constructor(props: BedroomConstructor) {
    this.id = props.id || uuid()
    this.guest = props.guest
    this.status = props.status
    this.room_types = props.room_types
    this.hotel_id = props.hotel_id 
    this.position_X = props.position_X
    this.position_Y = props.position_Y


  }

  get publicInfo(){
    return{
      id : this.id ,
      guest : this.guest,
      status : this.status,
      room_types : this.room_types,
      hotel_id : this.hotel_id,
      position_X : this.position_X,
      position_Y : this.position_Y
     

    }
  }
  get data() {
    return {
      id: this.id,
      guest: this.guest,
      status: this.status,
      room_types: this.room_types,
      hotel_id: this.hotel_id,
      position_X: this.position_X,
      position_Y: this.position_Y
    }
  }
  static filter() {
    return ['id', 'guest', 'status', 'room_types']
  }

}
