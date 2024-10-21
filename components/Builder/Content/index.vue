<script setup lang="ts">
import { Content, fetchOneEntry, isPreviewing } from "@builder.io/sdk-vue";
import { REGISTERED_COMPONENTS } from "~/init-builder";

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

// Get REGISTERED_COMPONENTS for Builder
const getRegisteredComponents = () => {
  return REGISTERED_COMPONENTS;
};
</script>

<template>
  <div v-if="canShowContent">
    <Content
      :api-key="apiKey"
      :model="model"
      :content="content"
      :custom-components="getRegisteredComponents()"
    />
  </div>
  <div v-else>Content not Found</div>
</template>
