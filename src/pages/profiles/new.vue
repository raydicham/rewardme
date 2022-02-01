<script setup lang="ts">
import type { z } from 'zod'
import { Profile } from '~/schemas'
import { useProfiles } from '~/stores/profiles'

type ProfileType = z.infer<typeof Profile>
const router = useRouter()
const profileStore = useProfiles()

function onSubmit(profile: ProfileType) {
  const safeProfile = Profile.safeParse(profile)
  if (safeProfile.success) {
    profileStore.storeNewProfile(safeProfile.data)
    profileStore.setActiveProfile(safeProfile.data)
    router.push('/')
  }
}

</script>

<template>
  <div class="p-4 md:p-0 md:w-1/2 mx-auto">
    <h1 class="text-bold text-2xl">
      New Profile
    </h1>

    <ProfileForm @submit="onSubmit" />
  </div>
</template>
