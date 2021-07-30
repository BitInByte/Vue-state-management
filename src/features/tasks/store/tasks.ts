import { Module } from 'vuex';
import { RootStore } from '@/config/store/index';
import { Task } from '@/features/tasks/models/task';
import { TasksService } from '@/features/tasks/services/tasks';

export interface TaskStore {
  tasks: Task[];
}

export enum taskActionTypes {
  'GET_TASKS' = 'Tasks/getTasks',
  'ADD_TASK' = 'Tasks/addTask',
  'DELETE_TASK' = 'Tasks/deleteTask',
}

export const TaskModule: Module<TaskStore, RootStore> = {
  namespaced: true,
  state: {
    tasks: [],
  },
  mutations: {
    getTasks(state: TaskStore, tasks: Task[]): void {
      state.tasks = tasks;
    },
    addTask(state: TaskStore, task: Task): void {
      const newTasks = [...state.tasks];
      newTasks.push(task);
      state.tasks = newTasks;
    },
    deleteTask(state: TaskStore, taskId: string): void {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
  },
  actions: {
    async getTasks({ commit }): Promise<void> {
      const response = await TasksService.getAllTasks();

      if (response) {
        commit('getTasks', response);
      }
    },
    async addTask({ commit }, task: Task): Promise<void> {
      const response = await TasksService.saveTask(task);
      if (response) {
        commit('addTask', response);
      }
    },
    async deleteTask({ commit }, taskId: string): Promise<void> {
      const success = await TasksService.deleteTask(taskId);
      if (success) {
        commit('deleteTask', taskId);
      }
    },
  },
};
