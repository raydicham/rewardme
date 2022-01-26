import { acceptHMRUpdate, defineStore } from 'pinia'
import type { z } from 'zod'
import type { ProfileSummaries } from '~/schemas'
import { Profile, ProfileSummary } from '~/schemas'

type ProfileType = z.infer<typeof Profile>
type ProfileSummariesType = z.infer<typeof ProfileSummaries>
type ProfileSummaryType = z.infer<typeof ProfileSummary>

const makeActiveKey = (profile: ProfileType|ProfileSummaryType) => `rewardme::profile::${profile.id}`

export const useProfiles = defineStore('profiles', () => {
  const activeKey = useStorage('rewardme::activekey', '')
  const profiles = useStorage('rewardme::profiles', [] as ProfileSummariesType)
  const active = ref(JSON.parse(localStorage.getItem(activeKey.value) || '{}') as ProfileType)

  watch(activeKey, () => {
    localStorage.setItem(makeActiveKey(active.value), JSON.stringify(active.value))
    active.value = JSON.parse(localStorage.getItem(activeKey.value) || '{}')
  })

  watch(active, () => {
    localStorage.setItem(makeActiveKey(active.value), JSON.stringify(active.value))
  }, { deep: true })

  function storeNewProfile(profile: ProfileType) {
    const safeProfile = Profile.safeParse(profile)
    if (safeProfile.success) {
      profiles.value.push(ProfileSummary.parse(profile))
      active.value = safeProfile.data
    }
    return safeProfile
  }

  function setActiveProfile(profile: ProfileSummaryType) {
    activeKey.value = makeActiveKey(profile)
  }

  return {
    active,
    setActiveProfile,
    profiles,
    storeNewProfile,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProfiles, import.meta.hot))
