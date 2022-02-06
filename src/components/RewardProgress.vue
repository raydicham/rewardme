<template>
  <q-linear-progress :size="size || '25px'" :value="progress" color="accent">
    <div class="absolute-full flex flex-center">
      <q-badge color="white" text-color="accent" :label="label" />
    </div>
  </q-linear-progress>
</template>
<script lang="ts">
import type { z } from 'zod'
import type { Task } from '~/schemas'

type TaskType = z.infer<typeof Task>

export default {
  props: ['reward', 'size'],
  computed: {
    tasks(): Record<string, TaskType> {
      return this.reward.tasks
    },
    tasksComplete() {
      return Object.values(this.tasks).filter(task => task.done).length
    },
    totalTasks() {
      return Object.values(this.tasks).length
    },
    progress(): Number {
      return this.tasksComplete / this.totalTasks
    },
    label() {
      return this.totalTasks ? `${this.tasksComplete} / ${this.totalTasks}` : 'Add Tasks'
    },
  },
}
</script>
