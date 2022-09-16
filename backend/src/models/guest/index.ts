// import { Address } from "../address";
import { Address } from "../address";
import { Guest } from "./guest";
import { GuestInMemory } from "./InMemory";
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

export const guestRepository = new GuestInMemory();


const guest = new Guest({
  id : "1",
  name: 'Matheus',
  email: 'matheus@gmail.com',
  cpf: '999.999.999-99',
  rg: 'any_rg',
  phone: 'any_phone',
  address: new Address({
    street: 'any_street',
    number: 'any_number',
    complement: 'any_complement',
    neighborhood: 'any_neighborhood',
    city: 'any_city',
    state: 'any_state',
    zipCode: '14400000',
  }
  
  ),
})
guestRepository.data = [guest]


