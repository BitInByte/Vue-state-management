<template>
  <div class="row center-content">
    <h2 class="text-center">Tasks</h2>
    <hr />
    <tasks-form></tasks-form>
    <tasks-list :loading="loading"></tasks-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TasksForm from '@/features/tasks/components/TasksForm.vue';
import TasksList from '@/features/tasks/components/TasksList.vue';
import { taskActionTypes } from '@/features/tasks/store/tasks';

interface TaskViewState {
  loading: boolean;
}

export default defineComponent({
  name: 'TasksView',
  data(): TaskViewState {
    return {
      loading: false,
    };
  },
  components: {
    TasksForm,
    TasksList,
  },
  async mounted(): Promise<void> {
    this.loading = true;
    await this.$store.dispatch(taskActionTypes.GET_TASKS);
    this.loading = false;
  },
});
</script>

<style lang="scss" scoped>
.center-content {
  display: flex;
  justify-content: center;
}
</style>
