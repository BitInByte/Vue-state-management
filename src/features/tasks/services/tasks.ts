import axios, { AxiosInstance } from "axios";

import { Task } from "@/features/tasks/models/task";

export class TasksService {
  private static ENDPOINT = "/tasks";
  private static httpInstance = axios.create({
    baseURL: `${process.env["VUE_APP_API"]}`,
  });

  public static async getAllTasks(): Promise<Task[] | null> {
    console.log("Endpoint url: ", this.httpInstance.defaults);
    console.log("Environment: ", process.env);
    try {
      const response = await this.httpInstance.get<Record<string, any>>(
        `${this.ENDPOINT}.json`
      );
      if (response.status === 200) {
        const tasks: Task[] = [];
        for (const key in response.data) {
          tasks.push(
            new Task(
              response.data[key]["task"],
              response.data[key]["time"],
              key
            )
          );
        }
        return tasks;
      }
      return null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public static async saveTask(task: Task): Promise<Task> {
    try {
      const response = await this.httpInstance.post<{ name: string }>(
        `${this.ENDPOINT}.json`,
        task
      );
      task.setId(response.data["name"])!;
      return task;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public static async deleteTask(taskId: string): Promise<boolean> {
    try {
      await this.httpInstance.delete<null>(`${this.ENDPOINT}/${taskId}.json`);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
