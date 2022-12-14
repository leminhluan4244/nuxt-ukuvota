<script lang="ts" setup>

interface Props {
  modelValue?: number,
  label?: string,
  min?: number,
  max?: number,
  marks?: Array<number>,
}

// @ts-ignore
const props = withDefaults(defineProps<Props>(), {
  label: '',
  min: 0,
  max: 60,
  modelValue: 0,
  marks: () => []
})

</script>
<template>
    <div class="px-2">
        <div class="text-center">
            <label>{{ label }}</label>
            <input :min="min" :max="max" class="w-20 bg-black color-white text-center" :value="modelValue" @change="(event) => $emit('update:modelValue', Number(event.target.value))" type="number"/>
        </div>

        <div class="flex flex-col w-50">
            <input type="range" :min="min" :max="max" list="tickmarks" :value="modelValue" @input="(event) => $emit('update:modelValue', Number(event.target.value))" show-input show-stops step="1"/>
            
            <datalist id="tickmarks" class="flex justify-between">
                <option class="text-xs ml-1" v-for="mark in marks" :value="mark" :label="mark.toString()"></option>
            </datalist>
        </div>
    </div>
</template>
<style scoped>
option {
    padding: 0;
}
</style>