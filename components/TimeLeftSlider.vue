<script lang="ts" setup>
interface Props {
  modelValue?: number
  label?: string
  min?: number
  max?: number
  marks?: Array<number>
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  min: 0,
  max: 60,
  modelValue: 0,
  marks: () => [],
})
</script>

<template>
  <div class="px-2">
    <div class="text-center">
      <label>{{ label }}</label>
      <input :min="min" :max="max" class="w-20 bg-black color-white text-center" :value="modelValue" type="number" @change="(event) => $emit('update:modelValue', Number(event.target?.value))">
    </div>

    <div class="flex flex-col w-50">
      <input type="range" :min="min" :max="max" list="tickmarks" :value="modelValue" show-input show-stops step="1" @input="(event) => $emit('update:modelValue', Number(event.target?.value))">

      <datalist id="tickmarks" class="flex justify-between">
        <option v-for="mark in marks" :key="mark" class="text-xs ml-1" :value="mark" :label="mark.toString()" />
      </datalist>
    </div>
  </div>
</template>

<style scoped>
option {
    padding: 0;
}
</style>
