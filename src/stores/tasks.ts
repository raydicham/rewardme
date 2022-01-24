import { acceptHMRUpdate, defineStore } from 'pinia'
import type { z } from 'zod'
import type { Task } from '~/schemas'

type TaskType = z.infer<typeof Task>

export const useTasks = defineStore('tasks', () => {
  const tasks = ref(new Array<TaskType>())

  function storeNewTask(task: TaskType) {
    tasks.value.push(task)
    return task
  }

  function getByReward(id: string) {
    return tasks.value.filter(task => task.reward === id)
  }

  return {
    storeNewTask,
    getByReward,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTasks, import.meta.hot))
