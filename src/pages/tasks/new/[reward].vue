<script setup lang="ts">
import type { z } from 'zod'
import { Task } from '~/schemas'
import { useTasks } from '~/stores/tasks'
import { useRewards } from '~/stores/rewards'

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
const task = reactive({
  name: '',
  reward: props.reward,
} as TaskType)

const linkedReward = rewardStore.getById(props.reward)

function onSubmit() {
  const parsed = Task.parse(task)
  store.storeNewTask(parsed)
  router.push('/rewards')
}

function onReset() {
  Object.assign(task, Task.parse({}))
}
</script>

<template>
  <div class="md:w-1/2 mx-auto">
    New Task
    <q-expansion-item
      expand-separator
      label="Task JSON"
    >
      <q-card>
        <q-card-section>
          <pre>{{ task }}</pre>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-form
      class="q-gutter-md"
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-input v-model="task.name" label="Name" required stack-label />
      <q-input :model-value="linkedReward?.name" label="Reward" disable stack-label />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>
