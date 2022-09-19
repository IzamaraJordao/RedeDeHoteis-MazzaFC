import { Guest } from "./guest";
import { GuestRepositorySequelize } from "./sequelize";
///////////////
export { Guest } from "./guest";
export {GuestInMemory} from "./InMemory";
export type { GuestConstructor } from "./guest";

export interface GuestRepository {
    save(guest: Guest): Promise<void>;
    paginate(): Promise<Guest[]>;
    findById(id: string): Promise<Guest>;
    findByCpf(cpf: string): Promise<Guest| undefined>;
    delete(id: string): Promise<void>;
    update(id: string, guest: Guest): Promise<void>;
}

export const guestRepository = new GuestRepositorySequelize();

