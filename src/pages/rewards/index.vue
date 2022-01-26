<script setup lang="ts">
import coverPng from '~/png/reward.png'
import { useRewards } from '~/stores/rewards'
import { useTasks } from '~/stores/tasks'
const store = useRewards()
const taskStore = useTasks()
</script>

<template>
  <q-page>
    <div class="flex flex-col items-center">
      <q-card w="full md:1/2">
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
        <q-card-section>
          <q-list bordered>
            <q-item
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
            <div v-if="Object.keys(store.rewards).length > 0">
              <q-item
                v-for="reward in store.rewards"
                :key="reward.id"
              >
                <q-item-section v-if="reward.image" avatar>
                  <img :src="reward.image" alt="" w="50px" border="rounded-full">
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{ reward.name }}
                  </q-item-label>
                  <q-item-label caption>
                    <ul class="list-disc list-inside">
                      <li v-for="task in taskStore.getByReward(reward.id)" :key="task.id">
                        {{ task.name }}
                      </li>
                    </ul>
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    label="Add Task" :to="{name: 'tasks-new-reward', params: {
                      reward: reward.id
                    }}"
                  >
                    <carbon-add />
                  </q-btn>
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
