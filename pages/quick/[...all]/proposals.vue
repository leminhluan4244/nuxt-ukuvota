<script lang="ts" setup>
import { weightingOptions } from '~~/composables/weightingOptions'
const weightOptions = weightingOptions()

definePageMeta({
  layout: 'quick',
})
const router = useRouter()
const route = useRoute()
const localePath = useLocalePath()

const id = route.params.all[0]
const quick = ref({
  title: '',
  description: '',
  weighting: 3,
  proposal_end: 0,
  voting_end: 0,
  timestamp: -1,
})
const getProcess = async () => {
  const options = {
    method: 'POST',
    body: {
      id,
    },
  }
  await useFetch('/api/getQuickProcess', options).then((res) => {
    if (res.data.value === -1)
      router.push(localePath('/quick/create'))
    else
      quick.value = res.data.value
  })
}
getProcess()

const currentTimestamp = ref(+new Date())
const countdown = function () {
  currentTimestamp.value = +new Date()

  if (quick.value.proposal_end < currentTimestamp.value)
    router.push({ name: 'QuickVoting', params: { id } })

  else
    setTimeout(countdown, 1)
}
setTimeout(countdown, 1)
</script>

<template>
  <div>
    <h1>{{ quick.title }}</h1>
    <p>{{ quick.description }}</p>
    <div>
      <CountdownView :current-time="currentTimestamp" label="Proposal time ends in" :timeleft="quick.proposal_end" />
      <CountdownView :current-time="new Date(quick.proposal_end).getTime()" label="Voting time will last for" :timeleft="quick.voting_end" />
      <NegativeScoreWeightingCard :weighting-label="weightOptions[quick.weighting - 1].label" />
    </div>
  </div>
</template>
