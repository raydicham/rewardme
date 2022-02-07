<script setup lang="ts">
import type { z } from 'zod'
import { Reward } from '~/schemas'
import useRewards from '~/composables/useRewards'

type RewardType = z.infer<typeof Reward>
const router = useRouter()
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
        New Reward
      </q-toolbar-title>
    </q-toolbar>

    <RewardForm @submit="onSubmit" />
  </div>
</template>
