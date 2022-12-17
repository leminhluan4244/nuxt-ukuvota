<script lang="ts" setup>
definePageMeta({
  layout: 'quick',
})
const router = useRouter()
const route = useRoute()

const id = route.params.all[0]
</script>

<template>
  <div>
    {{ id }}
  </div>
</template>
