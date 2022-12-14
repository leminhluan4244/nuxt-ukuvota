<script lang="ts" setup>
const localePath = useLocalePath()


const weightingOptions: { value: number; label: string }[] = [];

for (let i = 1; i <= 6; i++) {
  weightingOptions.push({
    value: i,
    label: `x${i}`,
  });
}

weightingOptions.push({
  value: -1,
  label: '∞',
});

const topicQuestion = ref("")
const topicDescription = ref("")
const negativeScoreWeighting = ref(weightingOptions[2].value)
const proposalTimeLeft = ref({ minutes: 20, hours: 3, days: 0 })
const votingTimeLeft = ref({minutes: 20, hours: 3, days: 0 })

const minuteMarks: Array<number> = [];
const hourMarks: Array<number> = [];
const dayMarks: Array<number> = [];

for (let i = 0; i <= 60; i += 12) {
  minuteMarks.push(i);
}
for (let i = 0; i <= 24; i += 6) {
  hourMarks.push(i);
}
for (let i = 0; i <= 60; i += 12) {
  dayMarks.push(i);
}

const calendarTimeLeftSelector = ref(false)
const toggleTimeLeftSelector = () => {
  calendarTimeLeftSelector.value = !calendarTimeLeftSelector.value
}
const captcha = ref("")
const color = useColorMode()
const getCaptcha = async() => {
  const captcha_color = color.value  === 'dark' ? '#fff' : '#000'
  const OPTIONS =  {method: 'POST', body: {color: captcha_color}}
  const { data } = await useFetch('/api/captcha', OPTIONS)
  if (data.value?.img_src)
      captcha.value = data.value.img_src

}
const init = () => {
  getCaptcha()
}

onActivated(() => {
    init()
})
watchEffect(() => {
  // tracks A0 and A1
  init()
})

onMounted(() => {
  console.log('mounted')
  setTimeout(init, 0.5)

})
const captchaCode = ref("")
</script>
<template>

    <div class="text-center max-w-screen-sm m-auto">
        <h1>{{ $t('quick.title') }}</h1>
        <form>
            <label for="topicQuestion">{{ $t('quick.topic') }}</label>
            <input type="text" name="topicQuestion" v-model="topicQuestion"/>
            <br/>
            <label for="topicDescription">{{ $t('quick.description') }}</label>
            <textarea name="topicDescription" v-model="topicDescription"/>
            <br/><br/>
            <label for="negativeScoreWeighting">{{ $t('quick.negativeScoreWeighting') }}</label>
            <span class="flex justify-center">
                <select class="mx-2 rounded" name="negativeScoreWeighting" v-model="negativeScoreWeighting">
                    <option v-for="weight in weightingOptions" :value="weight.value">{{ weight.label }}</option>
                </select>
                <NegativeScoreWeightingInfo/>
            </span>
            <br/>
            <h2>{{ $t('quick.timeLeftHeading') }}</h2>
            <button @click.prevent="toggleTimeLeftSelector" class="btn">
              <span v-if="calendarTimeLeftSelector">
                {{ $t('quick.switchSlider') }}
              </span>
              <span v-else>
                {{ $t('quick.switchCalendar') }}
              </span>
            </button>
            <div v-if="calendarTimeLeftSelector">
              <br/>
              <h4>{{ $t('wip') }}</h4>
              <br/>
              <NuxtLink :to="localePath('/donate')" class="btn">{{ $t('button.donate') }}</NuxtLink>
            </div>
            <div v-else class="flex justify-center mt-6">
                <div class="border-1 rounded p-2 mx-2">
                    <h3 class="mb-0">{{ $t('quick.proposalTime') }}</h3>
                    <TimeLeftSlider :label="$t('quick.minutes')" :min="1" :max="60" :marks="minuteMarks" v-model="proposalTimeLeft.minutes" />
                    <TimeLeftSlider :label="$t('quick.hours')" :max="24" :marks="hourMarks" v-model="proposalTimeLeft.hours" />
                    <TimeLeftSlider :label="$t('quick.days')" :max="60" :marks="dayMarks" v-model="proposalTimeLeft.days" />
                </div>
                <div class="border-1 rounded p-2 mx-2">
                    <h3 class="mb-0">{{ $t('quick.votingTime') }}</h3>
                    <TimeLeftSlider :label="$t('quick.minutes')" :min="1" :max="60" :marks="minuteMarks" v-model="votingTimeLeft.minutes" />
                    <TimeLeftSlider :label="$t('quick.hours')" :max="24" :marks="hourMarks" v-model="votingTimeLeft.hours" />
                    <TimeLeftSlider :label="$t('quick.days')" :max="60" :marks="dayMarks" v-model="votingTimeLeft.days" />
                </div>
            </div>
            <br/>
            <!--div align="center">
                <h2>{{ $t('captchaCode') }}</h2>
                <div class="flex items-center justify-center">
                  <img :src="captcha"/>
                  <button class="btn" i-carbon-renew @click.prevent="getCaptcha" />
                </div>
                <br/>
                <input type="text" name="captchaCode" v-model="captchaCode"/>
                <br/><br/>

              <br/>
            </div-->
            <button @click.prevent="" class="primary-btn">
              {{ $t('create')}}
            </button>

        </form>
    </div>
        
</template>