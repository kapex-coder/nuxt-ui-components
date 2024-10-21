<script setup lang="ts">
import { Content, fetchOneEntry, isPreviewing } from '@builder.io/sdk-vue';

const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const apiKey = runtimeConfig.public.builderPublicApiKey;
const canShowContent = ref(false);
const model = 'page';

const { data: content } = await useAsyncData('builderData', () =>
  fetchOneEntry({
    model,
    apiKey,
    userAttributes: {
      urlPath: route.path,
    },
  })
);

canShowContent.value = content.value ? true : isPreviewing(route.path);
</script>

<template>
  <div v-if="canShowContent">
    <Content :api-key="apiKey" :model="model" :content="content" />
  </div>
  <div v-else>Content not Found{{apiKey}}</div>
</template>