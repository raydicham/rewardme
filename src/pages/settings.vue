<script setup lang="ts">
import type { z } from 'zod'
import { Profile } from '~/schemas'
import { useProfiles } from '~/stores/profiles'

type ProfileType = z.infer<typeof Profile>
const profileStore = useProfiles()

function onSubmit(profile: ProfileType) {
  const safeProfile = Profile.safeParse(profile)
  if (safeProfile.success)
    Object.assign(profileStore.active, safeProfile.data)
}

</script>

<template>
  <div class="md:w-1/2 mx-auto">
    <h1 class="text-bold text-2xl">
      Settings
    </h1>

    <h2 class="text-bold text-xl">
      Current Profile
    </h2>
    <ProfileForm :model-value="profileStore.active" @submit="onSubmit" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
