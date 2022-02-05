<script setup lang="ts">
import type { z } from 'zod'
import imageCache from '~/composites/imageCache'
import type { Task } from '~/schemas'
import { useProfiles } from '~/stores/profiles'

type TaskType = z.infer<typeof Task>

const props = defineProps({
  rewardid: {
    type: String,
    required: true,
  },
})

const router = useRouter()
const profileStore = useProfiles()
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

</script>

<template>
  <q-page>
    <div class="flex flex-col items-center">
      <q-card w="full md:1/2">
        <q-card-section>
          <q-img
            :ratio="16/9"
            :src="rewardImage"
            spinner-color="primary"
            spinner-size="82px"
          >
            <div class="text-2xl absolute bottom-0 left-0 text-left capitalize">
              {{ reward.name }}
            </div>
          </q-img>
          <q-btn
            fab
            color="primary"
            class="absolute"
            style="bottom: 0; right: 12px; transform: translateY(-50%);"
            :to="{
              name: 'rewards-rewardid-edit',
              params: {
                rewardid: props.rewardid
              }
            }"
          >
            <carbon-edit />
          </q-btn>
        </q-card-section>
        <q-card-section>
          <q-list>
            <q-item-section>
              <q-item-label header>
                Tasks
              </q-item-label>
            </q-item-section>
            <q-item
              v-ripple
              clickable
              class="bg-secondary text-white"
              :to="{
                name: 'tasks-new-reward',
                params: {
                  reward: reward.id
                }
              }"
            >
              <q-item-section avatar>
                <carbon-add text="lg" />
              </q-item-section>
              <q-item-section>Add Task</q-item-section>
            </q-item>
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
