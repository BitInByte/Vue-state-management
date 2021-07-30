import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '@/features/tasks/models/task';
import { TasksService } from '@/features/tasks/services/tasks';

export interface TaskStore {
  tasks: Task[];
}

export class TasksStore {
  // BehaviorSubject allows us to specify
  // an initial value
  private subject = new BehaviorSubject<Task[]>([]);

  readonly tasks$: Observable<Task[]> = this.subject.asObservable();

  public get tasks(): Task[] {
    return [...this.subject.getValue()];
  }

  async getTasks(): Promise<void> {
    const response = await TasksService.getAllTasks();

    if (response) {
      this.subject.next(response);
    }
  }
  async addTask(task: Task): Promise<void> {
    const response = await TasksService.saveTask(task);
    if (response) {
      const newTasks = this.tasks;
      newTasks.push(response);
      this.subject.next(newTasks);
    }
  }
  async deleteTask(taskId: string): Promise<void> {
    const success = await TasksService.deleteTask(taskId);
    if (success) {
      const updatedTasks = this.tasks.filter((task) => task.id !== taskId);
      this.subject.next(updatedTasks);
    }
  }
}
