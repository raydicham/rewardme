import { acceptHMRUpdate, defineStore } from 'pinia'
import type { z } from 'zod'
import { useProfiles } from './profiles'
import type { Reward, Task } from '~/schemas'

type TaskType = z.infer<typeof Task>
type RewardType = z.infer<typeof Reward>

export const useTasks = defineStore('tasks', () => {
  const profileStore = useProfiles()

  function storeNewTask(reward: RewardType, task: TaskType) {
    profileStore.active.rewards[reward.id].tasks[task.id] = task
    return task
  }

  function deleteTask(reward: RewardType, task: TaskType) {
    const newTasks: Record<string, TaskType> = {}
    for (const key in reward.tasks) {
      if (key === task.id) {
        // skip item
      }
      else {
        newTasks[key] = reward.tasks[key]
      }
    }

    profileStore.active.rewards[reward.id].tasks = newTasks
  }

  function getByReward(id: string) {
    return profileStore.active.rewards[id].tasks
  }

  return {
    storeNewTask,
    getByReward,
    deleteTask,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTasks, import.meta.hot))
