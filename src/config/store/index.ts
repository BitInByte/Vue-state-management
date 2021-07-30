import { createStore } from 'vuex';
import { TaskModule, TaskStore } from '@/features/tasks/store/tasks';

export interface IStore {
  Tasks: TaskStore;
}

export interface RootStore {
  name?: string;
}

export default createStore<RootStore>({
  modules: {
    Tasks: TaskModule,
  },
});
