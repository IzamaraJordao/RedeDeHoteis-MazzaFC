import { DbError } from '../../exceptions/dbError';
import { GuestRepository } from "./";
import { Guest } from "./guest";


export class  GuestInMemory implements GuestRepository{
    private _data: Guest[] = [];

    constructor(){}
    save(guest: Guest): Promise<void> {
        const guestToSave = new Guest(guest);
        this._data.push(guestToSave);
        return Promise.resolve();
    }
    paginate(): Promise<Guest[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Guest> {
        const guest = this._data.find((guest) => guest.id === id);
        if (guest){
            return Promise.resolve(guest);
        }else{
            return Promise.reject(new DbError('Cliente não encontrado',404));
        }
    }
    findByCpf(cpf: string): Promise<Guest | undefined> {
        const guest = this._data.find((guest) => guest.cpf === cpf);
        if (guest){
            return Promise.resolve(guest);
        }else{
            return Promise.reject(new DbError('Cliente não encontrado',404));
        }
     
    }
    delete(id: string): Promise<void> {
        const index = this._data.findIndex((guest) => guest.id === id);
        if (index !== -1){
            this._data.splice(index,1);
            return Promise.resolve();
        }else{
            return Promise.reject(new DbError('Cliente não encontrado',404));
        }
    }
    update(id: string, guest: Guest): Promise<void> {
        const index = this._data.findIndex((guest) => guest.id === id);
        if (index !== -1){
            this._data[index] = guest;
            return Promise.resolve();
        }else{
            return Promise.reject(new DbError('Cliente não encontrado',404));
        }
        
    }

    set data(data: Guest[]){
        this._data = data;
    }
}
