import { Task } from '@/features/tasks/models/task';
import { TasksService } from '@/features/tasks/services/tasks';
import { observable, action } from 'mobx';

export interface TaskStore {
  tasks: Task[];
}

export class TasksStore {
  @observable tasks: Task[] = [];

  @action
  async getTasks(): Promise<void> {
    const response = await TasksService.getAllTasks();

    if (response) {
      this.tasks = response;
    }
  }

  @action
  async addTask(task: Task): Promise<void> {
    const response = await TasksService.saveTask(task);
    if (response) {
      const newTasks = this.tasks;
      newTasks.push(response);
      this.tasks = newTasks;
    }
  }

  @action
  async deleteTask(taskId: string): Promise<void> {
    const success = await TasksService.deleteTask(taskId);
    if (success) {
      const updatedTasks = this.tasks.filter((task) => task.id !== taskId);
      this.tasks = updatedTasks;
    }
  }
}
