import { acceptHMRUpdate, defineStore } from 'pinia'
import type { z } from 'zod'
import { useProfiles } from './profiles'
import type { Reward } from '~/schemas'

type RewardType = z.infer<typeof Reward>

export const useRewards = defineStore('rewards', () => {
  const profileStore = useProfiles()
  const rewards = ref(new Array<RewardType>())

  function storeNewReward(reward: RewardType) {
    rewards.value.push(reward)
    return reward
  }

  function getById(id: string) {
    return rewards.value.find((reward) => {
      return reward.id === id
    })
  }

  const currentProfileRewards = computed(() => {
    return rewards.value.filter((reward) => {
      return reward.profile === profileStore.activeProfile
    })
  })

  return {
    rewards,
    storeNewReward,
    currentProfileRewards,
    getById,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useRewards, import.meta.hot))
