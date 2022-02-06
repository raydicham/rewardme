<script setup lang="ts">
import coverPng from '~/png/reward.png'
import { useProfiles } from '~/stores/profiles'
const store = useProfiles()
const rewards = store.active.rewards
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
        <q-card-actions>
          <q-btn stretch round no-caps w="full" class="bg-secondary" to="/rewards/new">
            <carbon-add text="lg" />
            <span>Add Reward</span>
          </q-btn>
        </q-card-actions>
        <template v-if="!!rewards && Object.keys(rewards).length > 0">
          <q-card-section p="0 sm:4">
            <RewardList :rewards="rewards" />
          </q-card-section>
        </template>
        <template v-if="!!!rewards">
          <q-card-section>
            <div class="flex space-x-4 justify-center">
              <p>Add a reward</p>
              <carbon-arrow-down-right />
            </div>
          </q-card-section>
        </template>
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
