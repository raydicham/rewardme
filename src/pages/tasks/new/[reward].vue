<script setup lang="ts">
import type { z } from 'zod'
import { Task } from '~/schemas'
import useTasks from '~/composables/useTasks'
import useRewards from '~/composables/useRewards'

type TaskType = z.infer<typeof Task>
const props = defineProps({
  reward: {
    type: String,
    required: true,
  },
})

const store = useTasks()
const rewardStore = useRewards()
const router = useRouter()

const linkedReward = rewardStore.getById(props.reward)

function onSubmit(task: TaskType) {
  const safeTask = Task.safeParse(task)
  if (safeTask.success) {
    store.storeNewTask(linkedReward, safeTask.data)
    router.push({
      name: 'rewards-rewardid',
      params: {
        rewardid: props.reward,
      },
    })
  }
  else {
    console.error(safeTask)
  }
}
</script>

<template>
  <div class="md:w-1/2 mx-auto">
    <q-toolbar>
      <q-toolbar-title>
        New Task
      </q-toolbar-title>
    </q-toolbar>
    <TaskForm :reward="linkedReward" @submit="onSubmit" />
  </div>
</template>
