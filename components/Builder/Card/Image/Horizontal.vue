<template>
  <div class="w-full flex items-center bg-red-500">
    <NuxtImg src="/images/city.jpg" />
    <div>
      <Blocks
        :parent="props.builderBlock.id"
        path="component.options.content"
        :blocks="content || []"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Blocks } from "@builder.io/sdk-vue";

type Props = {
  builderBlock: any;
  content?: any[];
};

const props = defineProps<Props>();
</script>
