import { DbError } from '../../exceptions/dbError';
import { BedroomRepository } from ".";
import { Bedroom} from "./bedroom";


export class  BedroomInMemory implements BedroomRepository{
    private _data: Bedroom[] = [];

    constructor(){}
  saveMany(bedrooms: Bedroom[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
    save(bedroom: Bedroom): Promise<void> {
        const BedroomToSave = new Bedroom(bedroom);
        this._data.push(BedroomToSave);
        return Promise.resolve();
    }
    paginate(): Promise<Bedroom[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Bedroom> {
        const bedroom = this._data.find((bedroom) => bedroom.id === id);
        if (bedroom){
            return Promise.resolve(bedroom);
        }else{
            return Promise.reject(new DbError('Quarto não encontrado',404));
        }
    }
    // findByroom_types(room_types: string): Promise<Bedroom | undefined> {
    //     const bedroom = this._data.find((bedroom) => bedroom.
    //     if (bedroom){
    //         return Promise.resolve(bedroom);
    //     }
    //     return Promise.resolve(undefined);
    // }
    delete(id: string): Promise<void> {
        const index = this._data.findIndex((bedroom) => bedroom.id === id);
        if (index !== -1){
            this._data.splice(index,1);
            return Promise.resolve();
        }else{
            return Promise.reject(new DbError('Quarto não encontrado',404));
        }
    }
    update(id: string, bedroom: Bedroom): Promise<void> {
        throw new Error("Method not implemented.");
    }

    set data(data: Bedroom[]){
        this._data = data;
    }
}
