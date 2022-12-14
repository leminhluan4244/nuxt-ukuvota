
<script lang="ts" setup>
const switchLocalePath = useSwitchLocalePath()

const color = useColorMode()

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}

const { locales, locale } = useI18n()

const router = useRouter()

const setLocale = (event: Event & { target: any }) => {    
    router.push(switchLocalePath(event.target.value))
}

</script>
<template>
    <nav>
        <NavLink icon="i-carbon-campsite" to="/">{{ $t('button.home') }}</NavLink>
        <NavLink icon="i-carbon-idea" to="/quick/create">{{ $t('button.quick') }}</NavLink>
        <NavLink icon="i-carbon-catalog" to="/about">{{ $t('button.about') }}</NavLink>
        <NavLink icon="i-carbon-lifesaver" to="/donate">{{ $t('button.donate') }}</NavLink>
        <span class="flex-grow"></span>
        <button class="btn border-0 " @click="toggleDark">
            <div class="dark:i-carbon-moon i-carbon-sun" />
        </button>
        <select @change="setLocale" >
            <option v-for="lang in locales" :selected="lang.code === locale" :value="lang.code">{{ lang.code }}</option>
        </select>
    </nav>    
</template>
<style scoped>
nav {
    @apply m-0 flex flex-row flex-nowrap p-0 border-b-1 border-solid border-gray-400;
}

button, select {
    @apply border-0;
}

button:hover, select:hover {
    @apply bg-orange-400 bg-opacity-20 text-orange-600;
}


</style>