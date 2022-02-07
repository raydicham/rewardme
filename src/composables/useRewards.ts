import type { z } from 'zod'
import { useProfiles } from '~/stores/profiles'
import type { Reward } from '~/schemas'

type RewardType = z.infer<typeof Reward>

export default function() {
  const profileStore = useProfiles()
  const rewards = computed(() => {
    return profileStore.active?.rewards
  })

  function storeNewReward(reward: RewardType) {
    if (reward.id in profileStore.active.rewards) {
      // update
      reward.updateddate = new Date().toUTCString()
    }
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
}
