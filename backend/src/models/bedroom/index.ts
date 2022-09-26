import { Bedroom } from "./bedroom";
import { BedroomRepositorySequelize } from "./sequelize";
///////////////
export { Bedroom} from "./bedroom";
export {BedroomInMemory} from "./InMemory";
export type { BedroomConstructor } from "./bedroom";

export interface BedroomRepository {
    save(bedroom: Bedroom): Promise<void>;
    paginate(): Promise<Bedroom[]>;
    findById(id: string): Promise<Bedroom>;
    findBytipo(tipo: string): Promise<Bedroom| undefined>;
    delete(id: string): Promise<void>;
    update(id: string, bedroom: Bedroom): Promise<void>;
}

export const bedroomRepository = new BedroomRepositorySequelize();

