<script setup lang="ts">
import coverPng from '~/png/task.png'

</script>

<template>
  <q-page>
    <div class="flex flex-col items-center">
      <q-card w="full md:1/2">
        <q-img
          :ratio="16/9"
          :src="coverPng"
          spinner-color="primary"
          spinner-size="82px"
        >
          <div class="fixed bottom-0 left-0 font-bold text-xl">
            Tasks
          </div>
        </q-img>
        <q-card-section>
          <q-list bordered>
            <q-item v-ripple>
              <q-item-section>
                Add rewards to get started
              </q-item-section>
              <q-item-section side>
                <q-btn to="/rewards">
                  <span p="r-2">Rewards</span><carbon-arrow-right />
                </q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
