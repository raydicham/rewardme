<template>
  <UseTimeAgo v-slot="{ timeAgo }" :time="new Date(date)">
    <span class="text-xs text-gray-400">({{ timeAgo }})</span>
  </UseTimeAgo>
</template>

<script lang="ts">
import { UseTimeAgo } from '@vueuse/components'

export default {
  components: { UseTimeAgo },
  props: {
    date: {
      required: true,
    },
  },
}
</script>
