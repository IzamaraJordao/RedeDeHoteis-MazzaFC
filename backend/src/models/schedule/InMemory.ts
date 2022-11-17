import { DbError } from '../../exceptions/dbError';
import { ScheduleRepository } from ".";
import { Schedule } from "./schedule";


export class  ScheduleInMemory implements ScheduleRepository{
    private _data: Schedule[] = [];
    constructor(){}
  findFreeBedrooms(check_in: string, check_out: string, hotel_id: string): Promise<Schedule[]> {
    throw new Error('Method not implemented.');
  }
  findNotFreeBedrooms(check_in: string, check_out: string, hotel_id: string): Promise<Schedule[]> {
    throw new Error('Method not implemented.');
  }
    save(schedule: Schedule): Promise<void> {
        const scheduleToSave = new Schedule(schedule);
        this._data.push(scheduleToSave);
        return Promise.resolve();
    }
    paginate(): Promise<Schedule[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Schedule> {
        const schedule = this._data.find((schedule) => schedule.id === id);
        if (schedule){
            return Promise.resolve(schedule);
        }else{
            return Promise.reject(new DbError('Agendamento não encontrado',404));
        }
    }
    findAll(): Promise<Schedule[]> {
        const schedules = this._data;
      if(schedules){
        return Promise.resolve(schedules);
      }else{
        return Promise.reject(new DbError('Agendamentos não encontrados',404));
      }
    }
    
    
    delete(id: string): Promise<void> {
        const index = this._data.findIndex((schedule) => schedule.id === id);
        if (index !== -1){
            this._data.splice(index,1);
            return Promise.resolve();
        }else{
            return Promise.reject(new DbError('Agendamento não deletado',404));
        }
    }
    update(id: string, schedule: Schedule): Promise<void> {
        const index = this._data.findIndex((schedule) => schedule.id === id);
        if (index !== -1){
            this._data[index] = schedule;
            return Promise.resolve();
        }else{
            return Promise.reject(new DbError('Agendamento não alterado',404));
        }
        
    }

    set data(data: Schedule[]){
        this._data = data;
    }
}
