import { Schedule } from "./schedule";
import { ScheduleRepositorySequelize } from "./sequelize";
export {ScheduleInMemory} from "./InMemory";
export type { ScheduleConstructor } from "./schedule";
export { ScheduleRepositorySequelize } from "./sequelize";

export type PaginateParams = {
  page: number;
  pageSize: number;
  filter:{
    [key:string] :string | number | boolean
  }
}

export interface ScheduleRepository {
    save(schedule: Schedule): Promise<void>;
    findById(id: string): Promise<Schedule>;
    delete(id: string): Promise<void>;
    update(id: string, schedule: Schedule): Promise<void>;
    findAll(): Promise<Schedule[]>;

    
}

export const ScheduleRepository =  new ScheduleRepositorySequelize();


