import { uuid } from '../../helpers/uuid'



export type BedroomConstructor = {
  id?: string
  floor:number
  hotel_id: string
  position_X: number
  position_Y: number
  
}


export class Bedroom {
  id: string
  floor: number
  hotel_id: string
  position_X: number
  position_Y: number

 

  constructor(props: BedroomConstructor) {
    this.id = props.id || uuid()
    this.floor = props.floor
    this.hotel_id = props.hotel_id
    this.position_X = props.position_X
    this.position_Y = props.position_Y


  }

  get publicInfo(){
    return{
      id : this.id ,
      floor: this.floor,
      hotel_id : this.hotel_id,
      position_X : this.position_X,
      position_Y : this.position_Y
     

    }
  }
  get data() {
    return {
      id: this.id,
      floor: this.floor,
      hotel_id: this.hotel_id,
      position_X: this.position_X,
      position_Y: this.position_Y
    }
  }
  static filter() {
    return ['id', 'status', 'room_types']
  }

}
