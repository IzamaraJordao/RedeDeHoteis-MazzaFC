import { Bedroom } from "./bedroom";
import { BedroomRepositorySequelize } from "./sequelize";
///////////////
export { Bedroom} from "./bedroom";
// export {BedroomInMemory} from "./InMemory";
export type { BedroomConstructor } from "./bedroom";

export type PaginateParams = {
  page: number;
  pageSize: number;
  filter:{
    [key:string] :string | number | boolean
  }
}

export interface BedroomRepository {
    saveMany(bedrooms: Bedroom[]): Promise<void>;
    getFloor(hotel_id: Bedroom["hotel_id"]): Promise<Bedroom["floor"][]>;
    getBedrooms(hotel_id: Bedroom["hotel_id"], floor: Bedroom["floor"] ): Promise<Bedroom[]>;
    update(id: string, bedroom: Bedroom): Promise<void>;
}

export const bedroomRepository = new BedroomRepositorySequelize();

