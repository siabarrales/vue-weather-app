<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <div class="card">
    <h1>Weather Content</h1>
  </div>
</template>

<style scoped></style>
