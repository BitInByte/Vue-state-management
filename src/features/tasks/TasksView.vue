<template>
  <div class="row center-content">
    <h2 class="text-center">Tasks</h2>
    <hr />
    <tasks-form @on-submit="addTask" :loading="formLoading"></tasks-form>
    <tasks-list
      @on-delete="deleteTask"
      :tasks="tasks"
      :loading="loading"
    ></tasks-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TasksForm from '@/features/tasks/components/TasksForm.vue';
import TasksList from '@/features/tasks/components/TasksList.vue';
import { TasksService } from '@/features/tasks/services/tasks';
import { Task } from '@/features/tasks/models/task';
export default defineComponent({
  name: 'TasksView',
  data() {
    return {
      tasks: [] as Task[],
      loading: false,
      formLoading: false,
    };
  },
  components: {
    TasksForm,
    TasksList,
  },
  async mounted() {
    this.loading = true;
    const response = await TasksService.getAllTasks();
    console.log(response);
    if (response) {
      this.tasks = response;
    }
    this.loading = false;
  },
  methods: {
    async addTask(task: string) {
      console.log('Task: ', task);
      this.formLoading = true;
      const response = await TasksService.saveTask(new Task(task, Date.now()));
      this.tasks.push(response);
      this.formLoading = false;
    },
    async deleteTask(taskId: string) {
      const success = await TasksService.deleteTask(taskId);
      if (success) {
        const updatedTasks = this.tasks.filter((task) => task.id !== taskId);
        this.tasks = updatedTasks;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.center-content {
  display: flex;
  justify-content: center;
}
</style>
