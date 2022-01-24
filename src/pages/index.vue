<script setup lang="ts">
import coverPng from '~/png/children.png'
import { useProfiles } from '~/stores/profiles'
const profileStore = useProfiles()

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
            <template v-if="profileStore.profiles.length > 0">
              <q-item
                v-for="profile in profileStore.profiles" :key="profile.id"
                v-ripple
                clickable @click="profileStore.setActiveProfile(profile)"
              >
                <q-item-section v-if="profile.image" avatar>
                  <img :src="profile.image" alt="" w="50px" border="rounded-full">
                </q-item-section>
                <q-item-section class="capitalize">
                  {{ profile.name }}
                </q-item-section>
                <q-item-section v-if="profileStore.activeProfile === profile.id" side>
                  <carbon-star />
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
