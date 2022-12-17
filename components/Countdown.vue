<script lang="ts" setup>
const props = defineProps({
  timeleft: {
    type: String,
    required: true,
  },
  label: String,
  currentTime: {
    type: Number,
    required: true,
  },
})

const counter = computed(() => {
  let time = (props.currentTime - +new Date(props.timeleft)) / 1000
  time = Math.abs(time)
  const seconds = time % 60
  time = (time - seconds) / 60
  const minutes = time % 60
  time = (time - minutes) / 60
  const hours = time % 24
  time = (time - hours) / 24
  const days = time

  return {
    seconds: Math.floor(seconds),
    minutes: Math.floor(minutes),
    hours: Math.floor(hours),
    days: Math.floor(days),
  }
})
</script>

<template>
  <div>
    <div align="middle">
      <p>{{ label }}</p>
      <TimeLeftView :value="counter.days" label="Day" />
      <TimeLeftView :value="counter.hours" label="Hour" />
      <TimeLeftView :value="counter.minutes" label="Minute" />
      <span v-if="counter.days <= 0 && counter.hours <= 0">
        <TimeLeftView :value="counter.seconds" label="Second" />
      </span>
    </div>
  </div>
</template>
