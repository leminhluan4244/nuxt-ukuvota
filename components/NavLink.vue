<script lang="ts" setup>
const props = defineProps({
  icon: {
    type: String,
    required: false,
  },
  to: {
    type: String,
    required: true,
  },
})

const localePath = useLocalePath()

const route = useRoute()

const path = computed(() => localePath(props.to))

const selected = computed(() => path.value === route.path)
</script>

<template>
  <NuxtLink :class="selected ? 'selected' : ''" :to="path">
    <div class="flex items-center">
      <div :class="icon" />
      <div v-if="icon">
&nbsp;
      </div>
      <slot />
    </div>
  </NuxtLink>
</template>

<style scoped>
a {
    @apply px-4 py-2 inline-block cursor-pointer text-current;
}
a:hover {
    @apply bg-orange-400 bg-opacity-20 text-orange-600;
}
a.selected {
    @apply border-b-2 border-solid border-orange-600 text-orange-600;

}
</style>
