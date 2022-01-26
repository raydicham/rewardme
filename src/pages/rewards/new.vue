<script setup lang="ts">
import type { z } from 'zod'
import { Reward } from '~/schemas'
import { useRewards } from '~/stores/rewards'

type RewardType = z.infer<typeof Reward>
const router = useRouter()
const rewardStore = useRewards()
const reward = reactive({
  name: '',
} as RewardType)

const rewardImage = ref()

watch(rewardImage, () => {
  const reader = new FileReader()
  reader.readAsDataURL(rewardImage.value as Blob)
  reader.onload = () => reward.image = reader.result as string
})

function onSubmit() {
  const safeReward = Reward.safeParse(reward)
  if (safeReward.success) {
    rewardStore.storeNewReward(safeReward.data)
    router.push('/rewards')
  }
}

function onReset() {
  Object.assign(reward, Reward.parse({}))
}
</script>

<template>
  <div class="md:w-1/2 mx-auto">
    New Reward
    <q-expansion-item
      expand-separator
      label="Reward JSON"
    >
      <q-card>
        <q-card-section>
          <pre>{{ reward }}</pre>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-form
      class="q-gutter-md"
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-input v-model="reward.name" label="Name" required />
      <q-file v-model="rewardImage" outlined>
        <template #prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>
