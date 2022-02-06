<script setup lang="ts">
import type { z } from 'zod'
import type { Reward } from '~/schemas'
import { Task } from '~/schemas'

type TaskType = z.infer<typeof Task>
type RewardType = z.infer<typeof Reward>
const props = defineProps({
  reward: {
    required: true,
    default: {} as RewardType,
  },
  modelValue: {
    default: {
      name: '',
      done: false,
    } as TaskType,
  },
})

const emits = defineEmits(['submit'])

const task = reactive(Task.parse(props.modelValue))

function onSubmit() {
  const safeTask = Task.safeParse(task)
  if (safeTask.success)
    emits('submit', safeTask.data)
  else
    console.error(safeTask)
}

function onReset() {
  Object.assign(task, Task.parse(props.modelValue))
}
</script>

<template>
  <q-card>
    <q-card-section>
      <div>
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
          <q-input readonly :placeholder="props.reward?.name" model-value="" label="Reward" stack-label />
          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>
    </q-card-section>
  </q-card>
</template>
