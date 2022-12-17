<script lang="ts" setup>
import { weightingOptions } from '~~/composables/weightingOptions'
definePageMeta({
  layout: 'quick',
})
const router = useRouter()
const localePath = useLocalePath()
const { t } = useI18n()

const weightOptions = weightingOptions()
const topicQuestion = ref('')
const topicDescription = ref('')
const weighting = ref(weightOptions[2])
const proposalTimeLeft = reactive({ minutes: 20, hours: 3, days: 0 })
const votingTimeLeft = reactive({ minutes: 20, hours: 3, days: 0 })

const minuteMarks: Array<number> = []
const hourMarks: Array<number> = []
const dayMarks: Array<number> = []

for (let i = 0; i <= 60; i += 12) minuteMarks.push(i)

for (let i = 0; i <= 24; i += 6) hourMarks.push(i)

for (let i = 0; i <= 60; i += 12) dayMarks.push(i)

const calendarTimeLeftSelector = ref(false)
const toggleTimeLeftSelector = () => {
  calendarTimeLeftSelector.value = !calendarTimeLeftSelector.value
}
const captcha = ref('')
const color = useColorMode()
const getCaptcha = async () => {
  const captcha_color = color.value === 'dark' ? '#fff' : '#000'
  const options = { method: 'POST', body: { color: captcha_color } }
  const { data } = await useFetch('/api/captcha', options)
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
  setTimeout(init, 0.5)
})
const captchaCode = ref('')

const getTimestamp = (obj: any) => {
  let rtn = 0
  rtn += obj.minutes * 60 * 1000
  rtn += obj.hours * 3600 * 1000
  rtn += obj.days * 24 * 3600 * 1000
  return rtn
}

const proposals = [
  {
    id: 0,
    title: t('proposal.zero.title'),
    description: t('proposal.zero.description'),
    lastUpdate: +new Date(),
  },
  {
    id: 1,
    title: t('proposal.one.title'),
    description: t('proposal.zero.description'),
    lastUpdate: +new Date(),
  },
]

const submitForm = async () => {
  const options = {
    method: 'POST',
    body: {
      title: topicQuestion.value,
      description: topicDescription.value,
      weighting: weighting.value,
      proposal_end: new Date(+new Date() + getTimestamp(proposalTimeLeft)).toISOString(),
      voting_end: new Date(+new Date() + getTimestamp(proposalTimeLeft) + getTimestamp(votingTimeLeft)).toISOString(),
      proposals,
    },
  }
  const { data } = await useFetch('/api/addQuickProcess', options)

  const id = data.value?.id
  router.push(localePath(`/quick/${id}/proposals`))
}
</script>

<template>
  <div>
    <h1>{{ $t('quick.title') }}</h1>
    <form @submit.prevent="submitForm()">
      <label for="topicQuestion">{{ $t('quick.topic') }}</label>
      <input v-model="topicQuestion" type="text" name="topicQuestion">
      <br>
      <label for="topicDescription">{{ $t('quick.description') }}</label>
      <textarea v-model="topicDescription" name="topicDescription" />
      <br><br>
      <label for="negativeScoreWeighting">{{ $t('quick.negativeScoreWeighting') }}</label>
      <span class="flex justify-center">
        <select v-model="weighting" class="mx-2 rounded" name="negativeScoreWeighting">
          <option v-for="weight in weightOptions" :key="weight.value" :value="weight.value">{{ weight.label }}</option>
        </select>
        <NegativeScoreWeightingInfo />
      </span>
      <br>
      <h2>{{ $t('quick.timeLeftHeading') }}</h2>
      <button class="btn" @click.prevent="toggleTimeLeftSelector">
        <span v-if="calendarTimeLeftSelector">
          {{ $t('quick.switchSlider') }}
        </span>
        <span v-else>
          {{ $t('quick.switchCalendar') }}
        </span>
      </button>
      <div v-if="calendarTimeLeftSelector">
        <br>
        <h4>{{ $t('wip') }}</h4>
        <br>
        <NuxtLink :to="localePath('/donate')" class="btn">
          {{ $t('button.donate') }}
        </NuxtLink>
      </div>
      <div v-else class="flex justify-center mt-6">
        <div class="border-1 rounded p-2 mx-2">
          <h3 class="mb-0">
            {{ $t('quick.proposalTime') }}
          </h3>
          <TimeLeftSlider v-model="proposalTimeLeft.minutes" :label="$t('quick.minutes')" :min="1" :max="60" :marks="minuteMarks" />
          <TimeLeftSlider v-model="proposalTimeLeft.hours" :label="$t('quick.hours')" :max="24" :marks="hourMarks" />
          <TimeLeftSlider v-model="proposalTimeLeft.days" :label="$t('quick.days')" :max="60" :marks="dayMarks" />
        </div>
        <div class="border-1 rounded p-2 mx-2">
          <h3 class="mb-0">
            {{ $t('quick.votingTime') }}
          </h3>
          <TimeLeftSlider v-model="votingTimeLeft.minutes" :label="$t('quick.minutes')" :min="1" :max="60" :marks="minuteMarks" />
          <TimeLeftSlider v-model="votingTimeLeft.hours" :label="$t('quick.hours')" :max="24" :marks="hourMarks" />
          <TimeLeftSlider v-model="votingTimeLeft.days" :label="$t('quick.days')" :max="60" :marks="dayMarks" />
        </div>
      </div>
      <br>
      <!-- div align="center">
                <h2>{{ $t('captchaCode') }}</h2>
                <div class="flex items-center justify-center">
                  <img :src="captcha"/>
                  <button class="btn" i-carbon-renew @click.prevent="getCaptcha" />
                </div>
                <br/>
                <input type="text" name="captchaCode" v-model="captchaCode"/>
                <br/><br/>

              <br/>
            </div -->
      <button type="submit" class="primary-btn">
        {{ $t('create') }}
      </button>
    </form>
  </div>
</template>
