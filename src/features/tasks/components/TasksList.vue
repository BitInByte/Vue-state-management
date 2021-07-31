<template>
  <div class="row my-4 justify-content-center">
    <base-spinner v-if="loading"></base-spinner>
    <div class="col-md-12 col-lg-8 text-center" v-if="!loading">
      <p v-if="!hasTasks">No Tasks Added!</p>
      <ul class="list-group" v-if="hasTasks">
        <tasks-list-item
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @click="onClick(task.id)"
        ></tasks-list-item>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { observer } from 'mobx-vue';
import TasksListItem from '@/features/tasks/components/TasksListItem.vue';
import { Task } from '@/features/tasks/models/task';

interface TasksListState {
  tasks: Task[];
}

export default observer({
  name: 'TasksList',
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      tasks: this.$tasks.tasks.tasks,
    };
  },
  // data(): TasksListState {
  // return {
  // tasks: [],
  //};
  //},
  // subscriptions() {
  // console.log('Tasks: ', this.$store.tasks);
  // return {
  // tasks: this.$store.tasks.tasks$,
  // };
  //},
  components: {
    TasksListItem,
  },
  computed: {
    hasTasks(): boolean {
      return this.tasks.length > 0;
    },
  },
  methods: {
    onClick(taskId: string): void {
      this.$store.tasks.deleteTask(taskId);
    },
  },
});
</script>
