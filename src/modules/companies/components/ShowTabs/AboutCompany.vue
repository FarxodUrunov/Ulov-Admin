<script setup lang="ts">
import BaseImage from '@/shared/components/BaseImage/BaseImage.vue'
import { useTranslations } from '@/modules/companies/composables/useTranslations'

const { t } = useTranslations()
</script>

<template>
  <h3 class="text-xl lg:text-2xl font-bold text-dark mb-2">{{ t('aboutCompany') }}</h3>
  <p class="text-base font-normal text-dark-light mb-2">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis eveniet exercitationem
    impedit iusto vitae. Deserunt dolorum eum labore pariatur quod. Aliquid earum est ipsam ipsum
    odio omnis? Adipisci aspernatur consectetur culpa distinctio dolor dolores eligendi expedita,
    fuga incidunt labore nisi nobis possimus quae saepe tempore, tenetur voluptate. A ad atque
    cumque debitis dolorum enim eum ex, excepturi expedita explicabo inventore ipsam magnam magni
    necessitatibus nesciunt officia quam quia quisquam quo recusandae, sequi sit sunt tempora
    veritatis vero? Adipisci aliquam architecto enim fugit id ipsa iste natus neque odio, officiis
    perspiciatis possimus praesentium quae, qui repellendus reprehenderit sed voluptatem voluptates?
    Adipisci, enim ex explicabo libero neque nulla repellat repudiandae velit. Ab cum eveniet
    expedita illum praesentium quis quo sapiente, similique temporibus vel? Alias assumenda
    blanditiis cupiditate doloremque eius eligendi eos eum impedit in inventore minima molestias nam
    nemo nihil, non odio odit omnis quasi quibusdam quis quisquam quo sint unde voluptatum.
  </p>
  <div class="mt-6 border-t border-t-gray-light">
    <h3 class="text-xl lg:text-2xl font-bold text-dark mt-6 mb-4">Фотографии</h3>
    <div class="flex flex-wrap gap-4">
      <BaseImage
        v-for="key in 6"
        :key="key"
        src="https://images.pexels.com/photos/186537/pexels-photo-186537.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="Photo"
        class="w-52 rounded-xl"
      />
    </div>
  </div>
</template>
