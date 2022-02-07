<script setup lang="ts">
import type { z } from 'zod'
import imageCache from '~/composites/imageCache'
import type { Task } from '~/schemas'
import { useProfiles } from '~/stores/profiles'
import useRewards from '~/composables/useRewards'

type TaskType = z.infer<typeof Task>

const props = defineProps({
  rewardid: {
    type: String,
    required: true,
  },
})

const router = useRouter()
const profileStore = useProfiles()
const rewardStore = useRewards()
const rewards = profileStore.active.rewards
const reward = rewards[props.rewardid]
const tasks = reward.tasks

const confirmDelete = ref(false)

function deleteReward() {
  delete rewards[props.rewardid]
  router.push('/rewards')
}

function deleteTask(task: TaskType) {
  delete tasks[task.id]
}

const rewardImage = ref()
reward.image && imageCache.getImage(reward.image).then((image) => {
  rewardImage.value = image
})

watch(tasks, (newTasks) => {
  const allComplete = Object.values(newTasks).filter(task => !task.done).length === 0
  if (allComplete)
    reward.claimed = true

  else
    reward.claimed = false

  rewardStore.storeNewReward(reward)
})

</script>

<template>
  <q-page>
    <div class="flex flex-col items-center">
      <q-card w="full md:2/3">
        <q-card-section>
          <q-img
            :ratio="16/9"
            :src="rewardImage"
            spinner-color="primary"
            spinner-size="82px"
          >
            <div class="text-2xl absolute bottom-0 left-0 text-left capitalize reward-name-container space-x-4">
              <div class="name">
                {{ reward.name }}
              </div>
              <carbon-star v-if="reward.claimed" class="claimed" text="yellow-400" />
            </div>
          </q-img>
          <q-btn
            fab
            color="primary"
            class="absolute"
            style="bottom: 20px; right: 12px; transform: translateY(-50%);"
            :to="{
              name: 'rewards-rewardid-edit',
              params: {
                rewardid: props.rewardid
              }
            }"
          >
            <carbon-edit />
          </q-btn>
          <RewardProgress m="t-2" :reward="reward" />
        </q-card-section>
        <q-card-actions>
          <q-btn
            stretch round no-caps w="full" class="bg-secondary" :to="{
              name: 'tasks-new-reward',
              params: {
                reward: reward.id
              }
            }"
          >
            <carbon-add text="lg" />
            <span>Add Task</span>
          </q-btn>
        </q-card-actions>
        <q-card-section>
          <q-list>
            <q-item-section>
              <q-item-label header>
                Tasks
              </q-item-label>
            </q-item-section>
            <q-item v-for="task in tasks" :key="task.id" tag="label">
              <q-item-section side top>
                <q-checkbox v-model="task.done" color="positive" />
                <div text="xs center" w="full" :class="{'text-negative': !task.done, 'text-positive': task.done}">
                  Done
                </div>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ task.name }}</q-item-label>
                <q-item-label caption>
                  <LastUpdated :date="task.updateddate" />
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn stretch>
                  <carbon-overflow-menu-vertical />
                  <q-menu>
                    <q-list style="min-width: 100px">
                      <q-item v-close-popup clickable class="bg-red-6 text-dark" @click="deleteTask(task)">
                        <q-item-section class="flex items-center">
                          <carbon-trash-can class="text-xl" />
                        </q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item
                        v-close-popup clickable class="bg-primary" :to="{
                          name: 'rewards-rewardid-edit-taskid',
                          params: {
                            rewardid: reward.id,
                            taskid: task.id
                          }
                        }"
                      >
                        <q-item-section class="flex items-center">
                          <carbon-edit class="text-xl" />
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18,18]" expand>
      <q-btn fab color="red" @click="confirmDelete = true">
        <carbon-trash-can class="text-xl" />
      </q-btn>
    </q-page-sticky>

    <q-dialog v-model="confirmDelete">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar color="negative" text-color="white">
            <carbon-warning />
          </q-avatar>
          <div>
            <p class="q-ml-sm">
              Are you sure?
            </p>
            <p class="q-ml-sm">
              <i>This action cannot be reversed.</i>
            </p>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup flat label="Cancel" color="warning" />
          <q-btn v-close-popup flat label="Delete Reward" color="negative" @click="deleteReward" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

<style>
.reward-name-container {
  display: grid;
  grid-template-columns: 1fr 0.0fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  justify-items: stretch;
  justify-content: space-evenly;
  grid-template-areas:
    "name claimed";
}

.name {
  justify-self: start;
  grid-area: name;
}

.claimed {
  justify-self: end;
  grid-area: claimed;
}

</style>
