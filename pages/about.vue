<script setup lang="ts">
const { locale } = useI18n()
</script>

<template>
  <ContentDoc :path="`/${locale}/manual`" />
</template>

