import { StatusBedroom } from "./statusBedroom";
import { StatusBedroomRepositorySequelize } from "./sequelize";
///////////////
export { StatusBedroom } from "./statusBedroom";
export type { StatusBedroomConstructor } from "./statusBedroom";

export type PaginateParams = {
    page: number;
    pageSize: number;
    filter:{
      [key:string] :string | number | boolean
    }
  }


export interface StatusBedroomRepository {
    paginate(params: PaginateParams): Promise<StatusBedroom[] | number>;
    findById(id: string): Promise<StatusBedroom>;
}

export const statusRepository = new StatusBedroomRepositorySequelize();

