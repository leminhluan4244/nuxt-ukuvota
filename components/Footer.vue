<script lang="ts" setup>
const color = useColorMode()
const localePath = useLocalePath()

const menu = [
    {
        href: "mailto:ukuvota@proton.me",
        text: "@"
    },
    {
        href: "https://twitter.com/ukuvota",
        icon: "twitter"
    },
    {
        icon: "telegram",
        href: "https://t.me/Ukuvota",
        light: true
    },
    {
        href: "https://floss.social/@ukuvota",
        icon: "mastodon",
        light: true
    },
    {
        href: "https://www.patreon.com/ukuvota",
        icon: "patreon"
    },
    {
        href: "https://liberapay.com/ukuvota",
        icon: "liberapay",
        light: true
    },
    {
        href: "https://github.com/ukuvota/ukuvota",
        icon: "github"
    },
    {
        href: "https://codeberg.org/Ukuvota",
        icon: "codeberg"
    },
]

const getIcon = (item: any, dark: boolean) => {
    
    let rtn = item.icon
    if (dark) rtn += "_dark"
    rtn = "/icons/" + rtn + ".svg"
    return rtn
}


</script>
<template>
    <footer>
   
        <div class="flex flex-col w-full justify-between max-w-screen-lg items-center">
            <div class="flex items-center">
                <a class="mx-2" v-for="item in menu" :href="item.href" target="_blank">
                    <div>
                        <p v-if="item.text">{{ item.text }}</p>
                        <div v-if="color.value === 'dark' && item.light">
                            <img v-if="item.icon" :src="getIcon(item, true)"/>
                        </div>
                        <div v-else>
                            <img v-if="item.icon" :src="getIcon(item, false)"/>
                        </div>

                    </div>
                </a>
            </div>
            <div class="flex">
                <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank">no rights reserved</a>.
                powered by&nbsp;<a href="https://nuxt.com/">nuxt</a>. 
                hosted by&nbsp;<a href="https://fly.io/">fly.io</a>.
                supported with&nbsp;<NuxtLink :to="localePath('/donate')">donations</NuxtLink>.
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