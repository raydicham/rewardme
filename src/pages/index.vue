<script setup lang="ts">
import type { z } from 'zod'
import type { Reward } from '~/schemas'
import defaultRewardImage from '~/png/reward.png'
import imageCache from '~/composites/imageCache'
import { useProfiles } from '~/stores/profiles'
import useActiveProfileImage from '~/composables/useActiveProfileImage'

type RewardType = z.infer<typeof Reward>

const profileStore = useProfiles()
const profileImage = useActiveProfileImage()
const rewards = profileStore.active.rewards
const rewardImages = [] as string[]
const tasksPending = {} as Record<string, RewardType>

for (const key in rewards) {
  const reward = rewards[key]
  const tasks = reward.tasks
  if (!reward.claimed) {
    if (Object.keys(tasks).length === 0) {
      tasksPending[key] = reward
    }
    else {
      const pendingTasks = Object.values(tasks).filter(task => !task.done)
      if (pendingTasks.length)
        tasksPending[key] = reward
    }
  }
}

for (const key in rewards) {
  const imagePath = rewards[key].image
  if (imagePath) {
    imageCache.getImage(imagePath).then((image) => {
      if (image) rewardImages.push(image)
    })
  }
}

const imageCycle = useCycleList(rewardImages)

const interval = setInterval(() => {
  imageCycle.next()
}, 3000)

onUnmounted(() => {
  clearInterval(interval)
})

const numberOfProfiles = Object.keys(profileStore.profiles.filter(profile => !profile.archive)).length

</script>

<template>
  <q-page class="dashboardcontainer p-4 xl:w-2/3 md:mx-auto">
    <div class="Profiles flex">
      <q-btn class="flex-1" padding="5px" no-caps push to="/profiles" :rounded="false">
        <q-img v-if="profileImage" :src="profileImage" ratio="1">
          <div text="2xl" font="bold">
            Profiles <span v-if="numberOfProfiles > 0"> ({{ numberOfProfiles }})</span>
          </div>
        </q-img>
        <DefaultAvatar v-else>
          <div text="2xl" font="bold">
            <p>Profiles</p><p text="xs">
              Start here!
            </p>
          </div>
        </DefaultAvatar>
      </q-btn>
    </div>
    <div class="Rewards flex">
      <q-btn class="flex-1" padding="5px" no-caps push to="/rewards" :rounded="false">
        <q-img
          :src="rewardImages.length > 0 ? imageCycle.state : defaultRewardImage"
          ratio="1"
        >
          <div>
            <span text="2xl" font="bold">Rewards</span>
          </div>
        </q-img>
      </q-btn>
    </div>
    <div class="Tasks">
      <div class="w-full md:w-2/3 mx-auto">
        <div w="full">
          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title>Pending Tasks</q-toolbar-title>
          </q-toolbar>
          <div v-if="Object.keys(tasksPending).length > 0" class="space-y-4">
            <RewardList :rewards="tasksPending" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

 <style>
.dashboardcontainer {  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: max-content 1fr;
  gap: 10px 10px;
  grid-auto-flow: row dense;
  grid-template-areas:
    "Profiles Rewards"
    "Tasks Tasks";
}

.Tasks {
  grid-area: Tasks;
}
.Profiles { grid-area: Profiles; }

.Rewards { grid-area: Rewards; }

 </style>
