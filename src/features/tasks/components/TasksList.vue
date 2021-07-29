<template>
  <div class="row my-4 justify-content-center">
    <base-spinner v-if="loading"></base-spinner>
    <div class="col-md-12 col-lg-8" v-if="!loading">
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
import { defineComponent, PropType } from 'vue';
import TasksListItem from '@/features/tasks/components/TasksListItem.vue';
import { Task } from '@/features/tasks/models/task';

export default defineComponent({
  name: 'TasksList',
  props: {
    tasks: {
      type: Array as PropType<Task[]>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    TasksListItem,
  },
  computed: {
    hasTasks(): boolean {
      return this.tasks.length > 0;
    },
  },
  methods: {
    onClick(taskId: string) {
      this.$emit('onDelete', taskId);
    },
  },
});
</script>
