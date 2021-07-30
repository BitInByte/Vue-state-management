<template>
  <form @submit.prevent="onSubmit">
    <div class="row justify-content-center gy-3">
      <div class="col-sm-6">
        <base-spinner :isGrow="true" v-if="loading"></base-spinner>
        <input
          type="text"
          id="task"
          class="form-control"
          v-model="taskInput"
          v-if="!loading"
        />
      </div>
      <div class="col-auto">
        <button class="btn btn-primary" type="submit" :disabled="loading">
          Add Task
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Task } from '@/features/tasks/models/task';
import { taskActionTypes } from '../store/tasks';
interface TaskFormState {
  taskInput: string;
  loading: boolean;
}

export default defineComponent({
  name: 'TasksForm',
  data(): TaskFormState {
    return {
      taskInput: '',
      loading: false,
    };
  },
  methods: {
    async onSubmit(): Promise<void> {
      if (this.taskInput.length > 0) {
        this.loading = true;
        const task = new Task(this.taskInput, Date.now());
        await this.$store.dispatch(taskActionTypes.ADD_TASK, task);
        this.loading = false;
      }
    },
  },
});
</script>
