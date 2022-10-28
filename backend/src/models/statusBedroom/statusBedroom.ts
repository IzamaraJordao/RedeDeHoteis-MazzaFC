import { uuid } from '../../helpers/uuid'


export type StatusBedroomConstructor = {
  id?: string,
  name: string,

}

export class StatusBedroom {
    id : string
    name: string
   
 
  constructor(props: StatusBedroomConstructor) {
    this.id = props.id || uuid()
    this.name = props.name
  }

  get publicInfo(){
    return{
      id : this.id ,
      name : this.name,
    }
  }
  get data() {
    return {
      id: this.id,
      name: this.name,
    }
  }
  static filter() {
    return ['id', 'name']
  }

}
