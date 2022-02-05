<script setup lang="ts">
import imageCache from '~/composites/imageCache'
import coverPng from '~/png/reward.png'
import { useProfiles } from '~/stores/profiles'
const store = useProfiles()
const rewards = store.active.rewards
const rewardImages = ref({} as Record<string, string>)

rewards && Object.values(rewards)
  .map(async(reward) => {
    if (reward.image !== undefined) {
      const image = await imageCache.getImage(reward.image)
      if (image) rewardImages.value[reward.image] = image
    }
  })
</script>

<template>
  <q-page>
    <div class="flex flex-col items-center">
      <q-card w="full md:2/3 xl:1/2" p="0">
        <q-img
          :ratio="16/9"
          :src="coverPng"
          spinner-color="primary"
          spinner-size="82px"
        >
          <div class="fixed bottom-0 left-0 font-bold text-xl">
            Rewards
          </div>
        </q-img>
        <q-card-section p="0 sm:4">
          <q-list bordered>
            <q-item
              v-if="!!rewards"
              v-ripple
              clickable
              class="bg-secondary text-white"
              :border="false"
              to="/rewards/new"
            >
              <q-item-section avatar>
                <carbon-add text="lg" />
              </q-item-section>
              <q-item-section>Add Reward</q-item-section>
            </q-item>
            <q-separator />
            <div v-if="!!rewards && Object.keys(rewards).length > 0">
              <q-item
                v-for="reward in rewards"
                :key="reward.id"
                tag="label"
                :to="{name: 'rewards-rewardid', params: {
                  rewardid: reward.id
                }}"
              >
                <q-item-section v-if="reward.image" avatar>
                  <img :src="reward.image && rewardImages[reward.image]" alt="" w="50px" border="rounded-full">
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{ reward.name }} <LastUpdated :date="reward.updateddate" />
                  </q-item-label>
                  <q-item-label caption>
                    <ul class="list-disc list-inside">
                      <li v-for="task in reward.tasks" :key="task.id">
                        {{ task.name }}
                      </li>
                    </ul>
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <carbon-chevron-right text="xl" font="bold" />
                </q-item-section>
              </q-item>
            </div>
            <q-item
              v-else
              v-ripple
            >
              <q-item-section side>
                <carbon-arrow-down-right />
              </q-item-section>
              <q-item-section>
                Add rewards to get started
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
    <q-page-sticky
      v-if="store.active"
      position="bottom-right"
      :offset="[25,25]"
    >
      <q-btn fab color="accent" to="/rewards/new">
        <span class="pr-2">Add Reward</span> <carbon-gift style="font-size: x-large;" />
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
