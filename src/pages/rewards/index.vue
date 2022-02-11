<script setup lang="ts">
import coverPng from '~/png/reward.png'
import { useProfiles } from '~/stores/profiles'
const store = useProfiles()
const rewards = store.active.rewards
</script>

<template>
  <q-page>
    <div class="flex flex-col items-center">
      <q-card w="full md:2/3 xl:1/2">
        <q-card-section>
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
        </q-card-section>
        <q-card-section>
          <q-btn stretch round no-caps w="full" class="bg-primary text-secondary" to="/rewards/new">
            <carbon-add text="lg" />
            <span>Add Reward</span>
          </q-btn>
        </q-card-section>
        <template v-if="Object.keys(rewards).length > 0">
          <q-card-section>
            <RewardList :rewards="rewards" class="rounded-xl" />
          </q-card-section>
        </template>
        <template v-else>
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
      <q-btn fab class="bg-primary text-secondary" to="/rewards/new">
        <span class="pr-2">Add Reward</span> <carbon-gift style="font-size: large;" />
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
