<script setup lang="ts">
definePageMeta({
  title: 'pages.title.top' // set resoruce key
})

const { locale } = useI18n()

const router = useRouter()

const goToQuick = () => {
  router.push({path: '/quick/create'})
}


</script>

<template>
  <div>
    <div align="middle">
      <img alt="Ukuvota logo" class="logo" src="/logo.png" />
      <h1>Ukuvota</h1>
    </div>
    <ContentDoc :path="'/' + locale + '/introduction'"/>
    <div align="middle">
        <button class="primary-btn" @click="goToQuick">{{ $t('button.start_quick') }}</button>
    </div>
  </div>
</template>

<style scoped>
.logo {
  padding-top: 2em;
  width: 6em;
}
</style>
