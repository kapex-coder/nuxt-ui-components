<template>
    <div :class="twMerge('', props.appendClass)">
        <slot>
            Card Component
        </slot>
    </div>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

type Props = {
    appendClass?: string;
};

const props = defineProps<Props>();
</script>
