<script setup lang="ts">
import type { z } from 'zod'
import imageCache from '~/composites/imageCache'
import { Reward } from '~/schemas'

type RewardType = z.infer<typeof Reward>

const props = defineProps({
  modelValue: {
    default: {
      image: '',
      name: '',
    } as RewardType,
  },
})

const emits = defineEmits(['submit'])

const reward = reactive(Reward.parse(props.modelValue) as RewardType)

const rewardImage = ref()
const previewImage = ref()

watch(rewardImage, () => {
  const reader = new FileReader()
  reader.readAsDataURL(rewardImage.value as Blob)
  reader.onload = async() => {
    await imageCache.setImage(rewardImage.value.name, reader.result as string)
    reward.image = rewardImage.value.name
  }
})

watchEffect(async() => {
  if (reward.image)
    previewImage.value = await imageCache.getImage(reward.image)
})

function onSubmit() {
  const safeReward = Reward.safeParse(reward)
  if (safeReward.success)
    emits('submit', safeReward.data)
}

function onReset() {
  Object.assign(reward, Reward.parse(props.modelValue))
  rewardImage.value = null
  previewImage.value = null
}
</script>
<template>
  <div>
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
      <q-file v-model="rewardImage" :placeholder="reward.image" outlined>
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
