import { acceptHMRUpdate, defineStore } from 'pinia'
import type { z } from 'zod'
import { useProfiles } from './profiles'
import type { Reward } from '~/schemas'

type RewardType = z.infer<typeof Reward>

export const useRewards = defineStore('rewards', () => {
  const profileStore = useProfiles()
  const rewards = computed(() => {
    return profileStore.active.rewards
  })

  function storeNewReward(reward: RewardType) {
    profileStore.active.rewards[reward.id] = reward
    return reward
  }

  function getById(id: string) {
    return profileStore.active.rewards[id]
  }

  return {
    rewards,
    storeNewReward,
    getById,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useRewards, import.meta.hot))
