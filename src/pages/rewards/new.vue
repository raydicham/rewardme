<script setup lang="ts">
import type { z } from 'zod'
import imageCache from '~/composites/imageCache'
import { Reward } from '~/schemas'
import { useRewards } from '~/stores/rewards'

type RewardType = z.infer<typeof Reward>
const router = useRouter()
const rewardStore = useRewards()
const reward = reactive({
  name: '',
} as RewardType)

const rewardImage = ref()
const previewImage = ref()

watch(rewardImage, () => {
  const reader = new FileReader()
  reader.readAsDataURL(rewardImage.value as Blob)
  reader.onload = async() => {
    await imageCache.setImage(rewardImage.value.name, reader.result as string)
    previewImage.value = await imageCache.getImage(rewardImage.value.name)
    reward.image = rewardImage.value.name
  }
})

function onSubmit() {
  const safeReward = Reward.safeParse(reward)
  if (safeReward.success) {
    rewardStore.storeNewReward(safeReward.data)
    router.push('/rewards')
  }
}

function onReset() {
  Object.assign(reward, Reward.parse({ name: '' }))
  rewardImage.value = null
  previewImage.value = null
}
</script>

<template>
  <div class="p-4 md:p-0 md:w-1/2 mx-auto">
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
        <template #append>
          <q-avatar size="50px">
            <q-img
              :src="previewImage"
            />
          </q-avatar>
        </template>
      </q-file>
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>
