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
import TasksListItem from '@/features/tasks/components/TasksListItem.vue';
import { Task } from '@/features/tasks/models/task';
import { Subscription } from 'rxjs';

interface TasksListState {
  tasks: Task[];
  subscription?: Subscription;
}

export default defineComponent({
  name: 'TasksList',
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data(): TasksListState {
    return {
      tasks: [],
      subscription: undefined,
    };
  },
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
  // Since vue-rx is not supported in vue3 yet,
  // we can subscribe to it manually and
  // unsubscribe
  created() {
    this.subscription = this.$store.tasks.tasks$.subscribe(
      (tasks) => (this.tasks = tasks)
    );
  },
  beforeUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe;
    }
  },
  methods: {
    onClick(taskId: string): void {
      this.$store.tasks.deleteTask(taskId);
    },
  },
});
</script>
