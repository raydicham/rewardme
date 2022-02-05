import { ref, watchEffect } from 'vue'
import imageCache from '~/composites/imageCache'
import { useProfiles } from '~/stores/profiles'

export default function() {
  const store = useProfiles()

  const profileImage = ref <String|undefined>(undefined)

  watchEffect(async() => {
    if (store.active && store.active.image)
      profileImage.value = await imageCache.getImage(store.active.image)
    else
      profileImage.value = undefined
  })

  return profileImage
}
