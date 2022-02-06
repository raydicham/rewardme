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
  <div class="md:w-1/2 mx-auto">
    <q-toolbar>
      <q-toolbar-title>
        Edit Reward
      </q-toolbar-title>
    </q-toolbar>
    <RewardForm :model-value="reward" @submit="onSubmit" />
  </div>
</template>
