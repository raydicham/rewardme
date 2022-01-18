<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const props = defineProps<{ name: string }>()
const router = useRouter()
const user = useUserStore()
const { t } = useI18n()

watchEffect(() => {
  user.setNewName(props.name)
})
</script>

<template>
  <div>
    <p class="text-4xl">
      <carbon-pedestrian class="inline-block" />
    </p>
    <p>
      {{ t('intro.hi', { name: props.name }) }}
    </p>

    <p class="text-sm opacity-50">
      <em>{{ t('intro.dynamic-route') }}</em>
    </p>

    <template v-if="user.otherNames.length">
      <div class="text-sm mt-4">
        <span class="opacity-75">{{ t('intro.aka') }}:</span>
        <div class="flex justify-center">
          <q-list separator w="250px" text="center" dense>
            <q-item v-for="otherName in user.otherNames" :key="otherName" :to="`/hi/${otherName}`" replace>
              <q-item-section>
                {{ otherName }}
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </template>

    <div>
      <q-btn
        color="primary"
        class="btn m-3 text-sm mt-6"
        @click="router.back()"
      >
        {{ t('button.back') }}
      </q-btn>
    </div>
  </div>
</template>
