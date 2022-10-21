import { DbError } from '../../exceptions/dbError';
import { ReservationsRepository } from ".";
import { Reservations} from "./reservations";


export class  ReservationsInMemory implements ReservationsRepository{
    private _data: Reservations[] = [];

    constructor(){}
    save(reservations: Reservations): Promise<void> {
        const ReservationsToSave = new Reservations(reservations);
        this._data.push(ReservationsToSave);
        return Promise.resolve();
    }
    paginate(): Promise<Reservations[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Reservations> {
        const reservations = this._data.find((reservations) => reservations.id === id);
        if (reservations){
            return Promise.resolve(reservations);
        }else{
            return Promise.reject(new DbError('Reserva não encontrada',404));
        }
    }
    // findBytipo(tipo: string): Promise<Bedroom | undefined> {
    //     const bedroom = this._data.find((bedroom) => bedroom.tipo === tipo);
    //     if (bedroom){
    //         return Promise.resolve(bedroom);
    //     }
    //     return Promise.resolve(undefined);
    // }
    delete(id: string): Promise<void> {
        const index = this._data.findIndex((reservations) => reservations.id === id);
        if (index !== -1){
            this._data.splice(index,1);
            return Promise.resolve();
        }else{
            return Promise.reject(new DbError('Reserva  não encontrado',404));
        }
    }
    update(id: string, reservations: Reservations): Promise<void> {
        const index = this._data.findIndex((reservations) => reservations.id === id);
        if (index !== -1){
            this._data[index] = reservations;
            return Promise.resolve();
        }else{
            return Promise.reject(new DbError('Reserva não encontrada',404));
        }
        
    }

    set data(data: Reservations[]){
        this._data = data;
    }
}
