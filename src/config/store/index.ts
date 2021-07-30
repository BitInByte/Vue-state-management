import { TasksStore } from '@/features/tasks/store/tasks';

export interface IStore {
  tasks: TasksStore;
}

export default {
  tasks: new TasksStore(),
};
