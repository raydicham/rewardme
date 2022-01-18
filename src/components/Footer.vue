<script setup lang="ts">

import { isDark, toggleDark } from '~/composables'

const router = useRouter()

const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <nav class="text-xl mt-6">
    <q-btn :dark="isDark" class="mx-2" round color="primary" to="/" :title="t('button.home')" :disable="router.currentRoute.value.path === '/'">
      <carbon-campsite />
    </q-btn>

    <q-btn :dark="isDark" round color="primary" class="mx-2" :title="t('button.toggle_dark')" @click="toggleDark()">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </q-btn>

    <q-btn :dark="isDark" round color="primary" class="mx-2" :title="t('button.toggle_langs')" @click="toggleLocales()">
      <carbon-language />
    </q-btn>

    <q-btn :dark="isDark" round color="primary" class="mx-2" to="/about" :title="t('button.about')" :disable="router.currentRoute.value.path === '/about'">
      <carbon-dicom-overlay />
    </q-btn>

    <q-btn :dark="isDark" round color="primary" class="mx-2" href="https://github.com/antfu/vitesse" target="_blank" rel="noreferrer" title="Github">
      <carbon-logo-github />
    </q-btn>
  </nav>
</template>
