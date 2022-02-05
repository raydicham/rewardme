<script lang="ts">
import maleAvatar from '~/png/maleAvatar.png'
import femaleAvatar from '~/png/femaleAvatar.png'

export default {
  setup() {
    const profileImage = ref(femaleAvatar)

    const interval = setInterval(() => {
      if (profileImage.value === maleAvatar)
        profileImage.value = femaleAvatar

      else
        profileImage.value = maleAvatar
    }, 5000)
    return {
      profileImage, interval,
    }
  },
  unmounted() {
    clearInterval(this.interval)
  },
}
</script>

<template>
  <q-img
    ratio="1"
    :src="profileImage"
  >
    <slot />
  </q-img>
</template>
