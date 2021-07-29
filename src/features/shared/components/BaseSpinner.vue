<template>
  <div class="text-center">
    <div
      class="spinner-border text-primary"
      :class="isGrow ? 'spinner-grow' : 'spinner-border'"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseSpinner',
  props: {
    isGrow: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
