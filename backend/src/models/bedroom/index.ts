import { Bedroom } from "./bedroom";
import { BedroomRepositorySequelize } from "./sequelize";
///////////////
export { Bedroom} from "./bedroom";
export {BedroomInMemory} from "./InMemory";
export type { BedroomConstructor } from "./bedroom";

export type PaginateParams = {
    page: number;
    pageSize: number;
    filter:{
      [key:string] :string | number | boolean
    }
  }
  

export interface BedroomRepository {
    save(bedroom: Bedroom): Promise<void>;
    paginate(params: PaginateParams): Promise<Bedroom[] | number>;
    findById(id: string): Promise<Bedroom>;
    findByroom_types(room_types: string): Promise<Bedroom| undefined>;
    delete(id: string): Promise<void>;
    update(id: string, bedroom: Bedroom): Promise<void>;
}

export const bedroomRepository = new BedroomRepositorySequelize();

