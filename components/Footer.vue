<script lang="ts" setup>
const color = useColorMode()
const localePath = useLocalePath()

const menu = [
  {
    href: 'mailto:ukuvota@proton.me',
    text: '@',
  },
  {
    href: 'https://twitter.com/ukuvota',
    icon: 'twitter',
  },
  {
    icon: 'telegram',
    href: 'https://t.me/Ukuvota',
    light: true,
  },
  {
    href: 'https://floss.social/@ukuvota',
    icon: 'mastodon',
    light: true,
  },
  {
    href: 'https://www.patreon.com/ukuvota',
    icon: 'patreon',
  },
  {
    href: 'https://liberapay.com/ukuvota',
    icon: 'liberapay',
    light: true,
  },
  {
    href: 'https://github.com/waotzi/ukuvota',
    icon: 'github',
  },
]
</script>

<template>
  <footer>
    <div class="flex flex-col w-full justify-between max-w-screen-lg items-center">
      <div class="flex items-center">
        <a v-for="item in menu" :key="item.href" class="mx-2" :href="item.href" target="_blank">
          <p v-if="item.text">{{ item.text }}</p>
          <img v-if="item.icon" :src="`/icons/${item.icon}.png`">
        </a>
      </div>
      <div class="flex">
        <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank">no rights reserved</a>.
        powered by&nbsp;<a href="https://nuxt.com/">nuxt</a>.
        hosted by&nbsp;<a href="https://fly.io/">fly.io</a>.
        supported with&nbsp;<NuxtLink :to="localePath('/donate')">
          donations
        </NuxtLink>.
        maintained by&nbsp;<a href="https://waotzi.org">waotzi</a>.
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
    @apply flex flex-col h-full items-center justify-end m-10;
}

img {
    width: 18px;
}
</style>
