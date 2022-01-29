<script setup lang="ts">
import type { z } from 'zod'
import { Profile } from '~/schemas'
type ProfileType = z.infer<typeof Profile>

const props = defineProps({
  modelValue: {
    default: {
      name: '',
      nickname: '',
      color: '',
      hobby: '',
      dateofbirth: '',
      rewards: {},
    } as ProfileType,
  },
})
const emits = defineEmits(['submit'])

const profile = reactive(Profile.parse(props.modelValue))

const profileImage = ref()

watch(profileImage, () => {
  const reader = new FileReader()
  reader.readAsDataURL(profileImage.value as Blob)
  reader.onload = () => profile.image = reader.result as string
})

function onSubmit() {
  const safeProfile = Profile.safeParse(profile)
  if (safeProfile.success)
    emits('submit', safeProfile.data)
}

function onReset() {
  Object.assign(profile, Profile.parse(props.modelValue))
}

const calendartrigger = ref(undefined)
const colortrigger = ref(undefined)
</script>

<template>
  <div>
    <q-expansion-item
      expand-separator
      label="Profile JSON"
    >
      <q-card>
        <q-card-section>
          <pre>{{ profile }}</pre>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-form
      class="q-gutter-md"
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-input v-model="profile.name" label="Name" required stack-la bel />
      <q-input v-model="profile.nickname" label="Nickname" />
      <q-input v-model="profile.hobby" label="Hobby" />

      <q-input
        ref="calendartrigger"
        model-value=""
        stack-label
        :placeholder="profile.dateofbirth"
        label="Birthday"
        class="my-input"
      >
        <template #append>
          <carbon-calendar />
        </template>
      </q-input>
      <q-input
        ref="colortrigger"
        v-model="profile.color"
        :style="{'backgroundColor': profile.color}"
        label="Favourite Color"
        filled
        class="my-input"
      >
        <template #append>
          <carbon-color-palette />
        </template>
      </q-input>
      <q-file v-model="profileImage" outlined>
        <template #prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

    <q-popup-proxy touch-position :target="calendartrigger" transition-show="scale" transition-hide="scale">
      <q-date
        v-model="profile.dateofbirth"
        title="When is your birthday?"
      />
    </q-popup-proxy>

    <q-popup-proxy touch-position :target="colortrigger" transition-show="scale" transition-hide="scale">
      <q-color v-model="profile.color" w="300px" no-footer no-header default-view="palette" format-model="hex" />
    </q-popup-proxy>
  </div>
</template>
