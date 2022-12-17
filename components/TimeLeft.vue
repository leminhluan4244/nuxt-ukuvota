<script lang="ts" setup>
const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  label: String,
})
</script>

<template>
  <span v-if="value > 0">
    {{ value }}
    <span v-if="value > 1">
      {{ label }}s
    </span>
    <span v-else>
      {{ label }}
    </span>
  </span>
</template>
