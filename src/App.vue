<template>
  <div class="container my-3">
    <div class="row">
      <div class="col-md-12">
        <tasks-view></tasks-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TasksView from "@/features/tasks/TasksView.vue";

export default defineComponent({
  name: "App",
  components: {
    TasksView,
  },
});
</script>

<style lang="scss">
#app {
}
</style>
