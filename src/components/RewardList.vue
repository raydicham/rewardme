<template>
  <q-list separator>
    <q-item
      v-for="reward in sortedRewards"
      :key="reward.id"
      tag="label"
      :to="{name: 'rewards-rewardid', params: {
        rewardid: reward.id
      }}"
    >
      <q-item-section v-if="reward.image" avatar>
        <img :src="reward.image && rewardImages[reward.image]" alt="" w="50px">
      </q-item-section>
      <q-item-section>
        <q-item-label>
          {{ reward.name }} <LastUpdated :date="reward.updateddate" />
        </q-item-label>
        <q-item-label caption>
          <RewardProgress m="t-2" :reward="reward" size="20px" />
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <carbon-chevron-right text="xl" font="bold" />
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script lang="ts">
import type { z } from 'zod'
import imageCache from '~/composites/imageCache'
import type { Reward } from '~/schemas'

type RewardType = z.infer<typeof Reward>

export default {
  props: ['rewards'],
  setup(props) {
    const rewards = props.rewards as Record<string, RewardType>
    const rewardImages = ref({} as Record<string, string>)

    Object.values(rewards)
      .map(async(reward: RewardType): Promise<void> => {
        if (reward.image !== undefined) {
          const image = await imageCache.getImage(reward.image)
          if (image) rewardImages.value[reward.image] = image
        }
      })

    function byDateKey(dateKey: string) {
      return (first: RewardType, second: RewardType) => {
        return new Date(second[dateKey]) - new Date(first[dateKey])
      }
    }

    function excludeFalseKey(falseKey: string) {
      return (item: RewardType) => {
        return !item[falseKey]
      }
    }

    const sortedRewards = Object.values(rewards).sort(byDateKey('updateddate')).filter(excludeFalseKey('claimed'))
    return {
      sortedRewards,
      rewardImages,
    }
  },
}
</script>
