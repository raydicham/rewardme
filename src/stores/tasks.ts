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

  function getByReward(id: string) {
    return profileStore.active.rewards[id].tasks
  }

  return {
    storeNewTask,
    getByReward,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTasks, import.meta.hot))
