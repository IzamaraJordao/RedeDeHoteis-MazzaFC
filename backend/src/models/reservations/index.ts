import { Reservations} from "./reservations";
import { ReservationsRepositorySequelize } from "./sequelize";

///////////////
export { Reservations} from "./reservations";
export {ReservationsInMemory} from "./InMemory";
export type { ReservationsConstructor } from "./reservations";

export type PaginateParams = {
    page: number;
    pageSize: number;
    filter:{
      [key:string] :string | number | boolean
    }
  }
  

export interface ReservationsRepository {
    save(reservations: Reservations): Promise<void>;
    paginate(params: PaginateParams): Promise<Reservations[] | number>;
    findById(id: string): Promise<Reservations>;
    delete(id: string): Promise<void>;
    update(id: string, reservations: Reservations): Promise<void>;
}

export const reservationsRepository = new ReservationsRepositorySequelize();

