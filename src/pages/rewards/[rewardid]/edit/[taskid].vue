<script setup lang="ts">
import type { z } from 'zod'

import { Task } from '~/schemas'
import { useTasks } from '~/stores/tasks'
import { useRewards } from '~/stores/rewards'

type TaskType = z.infer<typeof Task>

const props = defineProps({
  rewardid: {
    type: String,
    required: true,
  },
  taskid: {
    type: String,
    required: true,
  },
})

const store = useTasks()
const rewardStore = useRewards()
const router = useRouter()

const reward = rewardStore.getById(props.rewardid)
const task = reward.tasks[props.taskid]

function onSubmit(task: TaskType) {
  const safeTask = Task.safeParse(task)
  if (safeTask.success) {
    store.storeNewTask(reward, safeTask.data)
    router.push({
      name: 'rewards-rewardid',
      params: {
        rewardid: props.rewardid,
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
        Edit Task
      </q-toolbar-title>
    </q-toolbar>
    <TaskForm :reward="reward" :model-value="task" @submit="onSubmit" />
  </div>
</template>
