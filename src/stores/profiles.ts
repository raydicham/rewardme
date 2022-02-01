import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { z } from 'zod'
import type { ProfileSummaries } from '~/schemas'
import { Profile, ProfileSummary } from '~/schemas'

type ProfileType = z.infer<typeof Profile>
type ProfileSummariesType = z.infer<typeof ProfileSummaries>
type ProfileSummaryType = z.infer<typeof ProfileSummary>

const makeActiveKey = (profile: ProfileType|ProfileSummaryType) => `rewardme::profile::${profile.id}`

function useOneProfile(key: Ref<string>) {
  const profile = reactive(JSON.parse(localStorage.getItem(key.value) || '{}') as ProfileType)

  watch(key, () => {
    const newProfile: ProfileType = JSON.parse(localStorage.getItem(key.value) || '{}')
    Object.assign(profile, newProfile)
  })

  watch(profile, () => {
    profile.updateddate = new Date().toUTCString()
    localStorage.setItem(makeActiveKey(profile), JSON.stringify(profile))
  })

  return profile
}

export const useProfiles = defineStore('profiles', () => {
  const _archive = useStorage('rewardme::archive', [] as String[])
  const activeKey = useStorage('rewardme::activekey', '')
  const profiles = useStorage('rewardme::profiles', [] as ProfileSummariesType)
  const active = useOneProfile(activeKey)

  watch(active, () => {
    const safeSummary = ProfileSummary.safeParse(active)
    if (safeSummary.success) {
      const summary = profiles.value.find(profile => profile.id === active.id)
      Object.assign(summary, safeSummary.data)
    }
  })

  function storeNewProfile(profile: ProfileType) {
    const safeProfile = Profile.safeParse(profile)
    const safeSummary = ProfileSummary.safeParse(profile)
    if (safeProfile.success && safeSummary.success) {
      profiles.value.push(safeSummary.data)
      Object.assign(active, safeProfile.data)
    }
    else {
      console.error('One of these failed:')
      console.error(safeProfile)
      console.error(safeSummary)
    }
    return safeProfile
  }

  function setActiveProfile(profile: ProfileType|ProfileSummaryType) {
    activeKey.value = makeActiveKey(profile)
  }

  function archiveProfile(profile: ProfileType|ProfileSummaryType) {
    profiles.value = profiles.value.filter(summary => summary.id !== profile.id)
    _archive.value.push(profile.id)
    activeKey.value = ''

    if (profiles.value.length > 0) {
      const nextActive = profiles.value.find(summary => !summary.archive)
      if (nextActive) setActiveProfile(nextActive)
    }
  }

  return {
    active,
    setActiveProfile,
    profiles,
    storeNewProfile,
    archiveProfile,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProfiles, import.meta.hot))
