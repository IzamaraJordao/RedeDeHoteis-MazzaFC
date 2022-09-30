
import { DbError } from "../../exceptions/dbError";
import { HotelRepository } from ".";
import { Hotel } from "./hotel";


export class HotelInMemory implements HotelRepository{
    private _data: Hotel[] = [];

    constructor(){}
    save(hotel: Hotel): Promise<void> {
        const hotelToSave = new Hotel(hotel);
        this._data.push(hotelToSave);
        return Promise.resolve();
    }
    paginate(): Promise<Hotel[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Hotel> {
        const hotel = this._data.find((hotel) => hotel.id === id);
        if (hotel){
            return Promise.resolve(hotel);
        }else{
            return Promise.reject(new DbError('Hotel não encontrado',404));
        }
    }
    findByCnpj(cnpj: string): Promise<Hotel | undefined > {
        const hotel = this._data.find((hotel) => hotel.cnpj === cnpj);
        if (hotel){
            return Promise.resolve(hotel);
        }
        return Promise.resolve(undefined);
    }
    delete(id: string): Promise<void> {
        const index = this._data.findIndex((hotel) => hotel.id === id);
        if (index !== -1){
            this._data.splice(index,1);
            return Promise.resolve();
        }else{
            return Promise.reject(new DbError('Hotel não encontrado',404));
        }
    }
    update(id: string, hotel: Hotel): Promise<void> {
        throw new Error("Method not implemented.");
    }

    set data(data: Hotel[]){
        this._data = data;
    }
}
