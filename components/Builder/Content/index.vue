<script setup lang="ts">
import { Content, fetchOneEntry, isPreviewing } from "@builder.io/sdk-vue";

type Props = {
  model?: string;
  userAttributes?: Record<string, any>;
};

const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const apiKey = runtimeConfig.public.builderPublicApiKey;
const canShowContent = ref(false);

const props = withDefaults(defineProps<Props>(), {
  model: "page",
});

const { data: content } = await useAsyncData("builderData", () =>
  fetchOneEntry({
    model: props.model,
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
  <div v-else>Content not Found</div>
</template>
