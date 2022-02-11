<script setup lang="ts">
import type { z } from 'zod'
import type { Profile } from '~/schemas'
import imageCache from '~/composites/imageCache'
import coverPng from '~/png/children.png'
import { useProfiles } from '~/stores/profiles'

type ProfileType = z.infer<typeof Profile>
const router = useRouter()
const store = useProfiles()
const profileImages = ref({} as Record<string, string>)

Object.values(store.profiles)
  .map(async(profile) => {
    if (profile.image !== undefined) {
      const image = await imageCache.getImage(profile.image)
      if (image) profileImages.value[profile.image] = image
    }
  })

function activateAndEdit(profile: ProfileType) {
  store.setActiveProfile(profile)
  router.push('/settings')
}
</script>

<template>
  <q-page>
    <div class="flex justify-center">
      <q-card w="full md:2/3 xl:1/2">
        <q-card-section>
          <q-img
            :ratio="16/9"
            :src="coverPng"
            spinner-color="primary"
            spinner-size="82px"
          >
            <div class="fixed bottom-0 left-0 font-bold text-xl">
              Profiles
            </div>
          </q-img>
        </q-card-section>
        <q-card-section>
          <q-btn stretch round no-caps w="full" class="text-secondary bg-primary" to="/profiles/new">
            <carbon-add text="lg" /> <span>Add Profile</span>
          </q-btn>
        </q-card-section>
        <q-card-section>
          <template v-if="!!store.profiles">
            <q-list>
              <q-item
                v-for="(profile,key) in store.profiles" :key="key"
              >
                <q-item-section avatar>
                  <q-avatar v-if="profile.image" w="50px" h="50px">
                    <q-img :src="profileImages[profile.image]" />
                  </q-avatar>
                  <DefaultAvatar v-else w="50px" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="capitalize">
                    {{ profile.name }}
                  </q-item-label>
                  <q-item-label class="capitalize" caption>
                    {{ profile.nickname }}
                  </q-item-label>
                </q-item-section>
                <q-item-section v-if="store.active.id === profile.id" side class="text-primary">
                  <q-btn unelevated disabled>
                    <div class="flex items-center">
                      <span p="r-2">Active</span> <carbon-star />
                    </div>
                  </q-btn>
                </q-item-section>
                <q-item-section v-else side class="text-accent">
                  <q-btn unelevated @click="store.setActiveProfile(profile)">
                    <div class="flex items-center">
                      <span p="r-2">switch</span> <carbon-touch-1 />
                    </div>
                  </q-btn>
                </q-item-section>
                <q-item-section side>
                  <q-btn stretch>
                    <carbon-overflow-menu-vertical />
                    <q-menu border="1 white" :offset="[0,5]">
                      <q-list style="min-width: 100px">
                        <q-item v-close-popup clickable class="bg-red-6 text-dark" @click="store.archiveProfile(profile)">
                          <q-item-section class="flex items-center">
                            <carbon-trash-can class="text-xl" />
                          </q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item v-close-popup clickable class="bg-primary" @click="activateAndEdit(profile)">
                          <q-item-section class="flex items-center">
                            <carbon-edit class="text-xl" />
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </template>
        </q-card-section>
        <q-card-section v-if="!!!store.profiles">
          <div class="flex space-x-4 justify-center">
            <p>Add a profile to get started</p>
            <carbon-arrow-down-right />
          </div>
        </q-card-section>
      </q-card>
    </div>
    <q-page-sticky position="bottom-right" :offset="[25,25]">
      <q-btn fab color="primary" to="/profiles/new" no-caps>
        <span class="pr-2">Add Profile</span> <carbon-user-follow style="font-size: large;" />
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
