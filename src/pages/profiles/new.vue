<script setup lang="ts">
import type { z } from 'zod'
import { Profile } from '~/schemas'
import { useProfiles } from '~/stores/profiles'

type ProfileType = z.infer<typeof Profile>
const router = useRouter()
const profileStore = useProfiles()
const profile = reactive({
  name: '',
  nickname: '',
  color: '',
  hobby: '',
  rewards: {},
} as ProfileType)

const profileImage = ref()

watch(profileImage, () => {
  const reader = new FileReader()
  reader.readAsDataURL(profileImage.value as Blob)
  reader.onload = () => profile.image = reader.result as string
})

function onSubmit() {
  profile.dateofbirth = new Date(profile.dateofbirth)
  const safeProfile = Profile.safeParse(profile)
  if (safeProfile.success) {
    profileStore.storeNewProfile(safeProfile.data)
    profileStore.setActiveProfile(safeProfile.data)
    router.push('/')
  }
}

function onReset() {
  Object.assign(profile, Profile.parse({}))
}

const calendartrigger = ref(undefined)
const colortrigger = ref(undefined)
</script>

<template>
  <div class="md:w-1/2 mx-auto">
    New Profile
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
        model-value=""
        stack-label
        :placeholder="profile.dateofbirth"
        label="Birthday"
        class="my-input"
      >
        <template #append>
          <carbon-calendar ref="calendartrigger" class="cursor-pointer" />
        </template>
      </q-input>
      <q-input
        v-model="profile.color"
        :style="{'backgroundColor': profile.color}"
        label="Favourite Color"
        filled
        class="my-input"
      >
        <template #append>
          <carbon-color-palette ref="colortrigger" class="cursor-pointer" />
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
  </div>

  <q-popup-proxy :target="calendartrigger" transition-show="scale" transition-hide="scale">
    <q-date
      v-model="profile.dateofbirth"
      label="Birthday"
    />
  </q-popup-proxy>

  <q-popup-proxy :target="colortrigger" transition-show="scale" transition-hide="scale">
    <q-color v-model="profile.color" no-footer no-header default-view="palette" format-model="hex" />
  </q-popup-proxy>
</template>
