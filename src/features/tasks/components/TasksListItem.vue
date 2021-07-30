<template>
  <li class="list-group-item list-group-item-action">
    <h6>{{ task.task }}</h6>
    <small class="text-muted">{{ task.time }}</small>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Task } from '@/features/tasks/models/task';

export default defineComponent({
  name: 'TasksListItem',
  props: {
    task: {
      //     type: Object as PropType<Task>,
      type: Task,
      required: true,
    },
  },
});
</script>
