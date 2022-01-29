<script setup lang="ts">
import coverPng from '~/png/children.png'
import { useProfiles } from '~/stores/profiles'
const store = useProfiles()
</script>

<template>
  <q-page>
    <div class="flex justify-center">
      <q-card w="full md:1/2">
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
        <q-card-section>
          <q-list separator>
            <q-item
              v-ripple
              clickable
              class="bg-secondary text-white"
              to="/profiles/new"
            >
              <q-item-section avatar>
                <carbon-add text="lg" />
              </q-item-section>
              <q-item-section>Add Profile</q-item-section>
            </q-item>
            <q-separator />
            <template v-if="store.profiles">
              <q-item
                v-for="(profile,key) in store.profiles" :key="key"
              >
                <q-item-section v-if="profile.image" avatar>
                  <img :src="profile.image" alt="" w="50px" border="rounded-full">
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
                <q-item-section v-else side class="text-secondary">
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
                        <q-item v-close-popup clickable class="bg-primary" to="/settings">
                          <q-item-section class="flex items-center">
                            <carbon-edit class="text-xl" />
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </q-item-section>
              </q-item>
            </template>
            <q-item
              v-else
              v-ripple
            >
              <q-item-section side>
                <carbon-arrow-down-right />
              </q-item-section>
              <q-item-section>
                Add a profile to get started
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
    <q-page-sticky position="bottom-right" :offset="[25,25]">
      <q-btn fab color="accent" to="/profiles/new">
        <span class="pr-2">Add Profile</span> <carbon-user-follow style="font-size: x-large;" />
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
