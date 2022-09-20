import { Hotel } from "./hotel";
import { HotelRepositorySequelize } from "./sequelize";

export { Hotel } from "./hotel";
export {HotelInMemory} from "./InMemory";
export type { HotelConstructor } from "./hotel";

export interface HotelRepository{
    save(hotel: Hotel): Promise<void>;
    paginate(): Promise<Hotel[]>;
    findById(id: string): Promise<Hotel>;
    findByCnpj(cnpj: number): Promise<Hotel | undefined>;
    delete(id: string): Promise<void>;
    update(id: string, hotel: Hotel): Promise<void>;
}

export const hotelRepository = new HotelRepositorySequelize();
