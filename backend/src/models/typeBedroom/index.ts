import { TypeBedroom } from "./typeBedroom";
import { TypeBedroomRepositorySequelize } from "./sequelize";
///////////////
export { TypeBedroom} from "./typeBedroom";
export type { TypeBedroomConstructor as BedroomConstructor } from "./typeBedroom";

export type PaginateParams = {
    page: number;
    pageSize: number;
    filter:{
      [key:string] :string | number | boolean
    }
  }


export interface TypeBedroomRepository {
    paginate(params: PaginateParams): Promise<TypeBedroom[] | number>;
    findById(id: string): Promise<TypeBedroom>;
}

export const typeRepository = new TypeBedroomRepositorySequelize();

