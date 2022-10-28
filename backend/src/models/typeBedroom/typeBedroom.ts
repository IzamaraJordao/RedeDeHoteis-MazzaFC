import { uuid } from '../../helpers/uuid'


export type TypeBedroomConstructor = {
  id?: string,
  name: string,
  color: string,
}

export class TypeBedroom {
    id : string
    name: string
    color: string
 
  constructor(props: TypeBedroomConstructor) {
    this.id = props.id || uuid()
    this.name = props.name
    this.color = props.color
  }

  get publicInfo(){
    return{
      id : this.id ,
      name : this.name,
      color : this.color
    }
  }
  get data() {
    return {
      id: this.id,
      name: this.name,
      color: this.color
    }
  }
  static filter() {
    return ['id', 'name', 'color']
  }

}
