<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <PageTemplate>
    <main class="px-4 py-10 text-center">
      <div class="text-4xl">
        <div i-carbon-warning inline-block />
      </div>
      <slot />
      <div>
        <button class="primary-btn text-sm m-3 m-t8" @click="router.back()">
          {{ $t('button.back') }}
        </button>
      </div>
    </main>
  </PageTemplate>
</template>
