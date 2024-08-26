<template>
    <div :class="twMerge('embla__slide min-w-0 flex-[0_0_calc(100%/1)] h-20', props.appendClass)">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { twMerge } from "tailwind-merge";
// Props types
type Props = {
    appendClass?: string;
}

// Define props with default values
const props = withDefaults(defineProps<Props>(), {})
</script>