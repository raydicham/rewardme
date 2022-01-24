import { acceptHMRUpdate, defineStore } from 'pinia'
import type { z } from 'zod'
import type { Profile } from '~/schemas'

type ProfileType = z.infer<typeof Profile>

export const useProfiles = defineStore('profiles', () => {
  const activeProfile = ref('')
  const profiles = ref(new Array<ProfileType>())

  function storeNewProfile(profile: ProfileType) {
    profiles.value.push(profile)
    activeProfile.value = profile.id
    return profile
  }

  function setActiveProfile(profile: ProfileType) {
    activeProfile.value = profile.id
  }

  return {
    activeProfile,
    setActiveProfile,
    profiles,
    storeNewProfile,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProfiles, import.meta.hot))
