<script setup lang="ts">

import { useUserStore } from '~/stores/user'
import { isDark } from '~/composables'

const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()
const go = () => {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

const { t } = useI18n()
</script>

<template>
  <div>
    <p class="text-4xl">
      <carbon-campsite class="inline-block" />
    </p>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        Vitesse
      </a>
    </p>
    <p>
      <em class="text-sm opacity-75">{{ t('intro.desc') }}</em>
    </p>

    <div class="py-4" />
    <div class="flex justify-center">
      <div w="250px">
        <q-input
          id="input"
          v-model="name"
          :dark="isDark"
          :placeholder="t('intro.whats-your-name')"
          :aria-label="t('intro.whats-your-name')"
          type="text"
          autocomplete="false"
          text="center"
          @keydown.enter="go"
        />
        <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>
      </div>
    </div>
    <div>
      <q-btn
        color="primary"
        class="m-3 text-sm"
        :disabled="!name"
        @click="go"
      >
        {{ t('button.go') }}
      </q-btn>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
