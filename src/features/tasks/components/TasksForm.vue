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

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TasksForm',
  data() {
    return {
      taskInput: '',
    };
  },
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onSubmit() {
      this.$emit('onSubmit', this.taskInput);
    },
  },
});
</script>
