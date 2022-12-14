<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="text-gray-700 dark:text-gray-200">
    <Navigation/>
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
  </div>  
</template>
