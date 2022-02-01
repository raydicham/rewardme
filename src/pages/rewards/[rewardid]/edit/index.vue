<script setup lang="ts">
import type { z } from 'zod'
import { Reward } from '~/schemas'
import { useRewards } from '~/stores/rewards'
import { useProfiles } from '~/stores/profiles'

type RewardType = z.infer<typeof Reward>

const props = defineProps({
  rewardid: {
    type: String,
    required: true,
  },
})

const router = useRouter()

const profileStore = useProfiles()
const rewards = profileStore.active.rewards
const reward = rewards[props.rewardid]
const rewardStore = useRewards()

function onSubmit(reward: RewardType) {
  const safeReward = Reward.safeParse(reward)
  if (safeReward.success) {
    rewardStore.storeNewReward(safeReward.data)
    router.push('/rewards')
  }
}

</script>

<template>
  <div class="p-4 md:p-0 md:w-1/2 mx-auto">
    New Reward
    <RewardForm :model-value="reward" @submit="onSubmit" />
  </div>
</template>
