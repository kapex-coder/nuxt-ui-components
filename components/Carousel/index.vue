<template>
  <div :class="twMerge(carousel_classes?.root_class)">
    <div :class="twMerge(carousel_classes?.viewport_class)" ref="emblaRef">
      <div
        :class="twMerge(carousel_classes?.container_class, props.layout === 'vertical' && carousel_classes?.vertical?.container_class)">
        <slot>
          <CarouselSlide>Slide 1</CarouselSlide>
          <CarouselSlide>Slide 2</CarouselSlide>
          <CarouselSlide>Slide 3</CarouselSlide>
        </slot>
      </div>
    </div>
    <div v-if="props.navigation || props.pagination" class="embla__controls">
      <div v-if="props.navigation" class="embla__buttons">
        <button type="button"
          :class="twMerge(carousel_classes?.button_class, props.layout === 'vertical' ? carousel_classes?.vertical?.prev_button_class : carousel_classes?.prev_button_class, prev_btn_disabled && carousel_classes.disabled_button_class)"
          @click="onPrevButtonClick" :disabled="prev_btn_disabled">
          <Icon class="text-xl" name="uil:angle-left-b" />
        </button>
        <button type="button"
          :class="twMerge(carousel_classes?.button_class, props.layout === 'vertical' ? carousel_classes?.vertical?.next_button_class : carousel_classes?.next_button_class, next_btn_disabled && carousel_classes.disabled_button_class)"
          @click="onNextButtonClick" :disabled="next_btn_disabled">
          <Icon class="text-xl" name="uil:angle-right-b" />
        </button>
      </div>
      <div v-if="props.pagination && props.layout !== 'vertical'" class="embla__dots flex justify-center gap-1">
        <button v-for="(snap, index) in scroll_snaps" :key="snap" type="button" @click="() => onDotButtonClick(index)"
          :class="twMerge('h-2 w-2 border rounded-full', selected_index === index && 'border-red-500')"></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { twMerge } from "tailwind-merge";
import emblaCarouselVue from "embla-carousel-vue";
import Autoplay from "embla-carousel-autoplay";

// Props types
type Props = {
  layout?: "horizontal" | "vertical";
  navigation?: boolean;
  pagination?: boolean;
  options?: object;
  active?: boolean;
  axis?: "x" | "y";
  align?: "start" | "center" | "end";
  breakpoints?: object;
  loop?: boolean;
  autoplay?: boolean;
};

// Define props with default values
const props = withDefaults(defineProps<Props>(), {
  layout: "vertical",
  options: () => ({}),
  active: true,
  navigation: true,
  pagination: true
});

// Carousel Options
const options = computed(() => ({
  ...props.options,
  ...(!props.active && { active: false }),
  ...(props.align && { align: props.align }),
  ...(props.layout === 'vertical' && { axis: "y" }),
  ...(props.loop && { loop: true })
}));

// Carousel Plugins
const plugins = computed(() => {
  const activePlugins = [];

  if (props.autoplay) activePlugins.push(Autoplay());

  return activePlugins;
});

// emblaCarousel ref
const [emblaRef, emblaApi] = emblaCarouselVue(options.value, plugins.value);
const selected_index = ref(0);
const scroll_snaps = ref();
const prev_btn_disabled = ref(true);
const next_btn_disabled = ref(true);

const onPrevButtonClick = () => {
  if (!emblaApi) return
  emblaApi?.value?.scrollPrev();
}

const onNextButtonClick = () => {
  if (!emblaApi) return
  emblaApi?.value?.scrollNext();
}

const onDotButtonClick = (index: number) => {
  if (!emblaApi) return
  emblaApi?.value?.scrollTo(index)
}

const onInit = () => {
  if (emblaApi.value) {
    scroll_snaps.value = emblaApi.value.scrollSnapList()
  }
}

const onSelect = () => {
  if (emblaApi.value) {
    selected_index.value = emblaApi.value.selectedScrollSnap();
    prev_btn_disabled.value = !emblaApi.value.canScrollPrev();
    next_btn_disabled.value = !emblaApi.value.canScrollNext();
  }
}

// Carousel classes
const carousel_classes: Record<any, any> = {
  root_class: "embla relative group",
  viewport_class: "embla__viewport overflow-hidden",
  container_class: "embla__container flex",
  button_class: "embla__button bg-white border h-8 w-8 rounded-full flex items-center justify-center transition-all duration-500 absolute opacity-0 group-hover:opacity-100",
  disabled_button_class: "bg-gray-200",
  prev_button_class: "embla__button--prev top-1/2 left-0 -translate-y-1/2 group-hover:-translate-x-1/2",
  next_button_class: "embla__button--next top-1/2 right-0 -translate-y-1/2 group-hover:translate-x-1/2",
  vertical: {
    container_class: 'flex-col h-[200px]',
    prev_button_class: "left-1/2 top-0 -translate-x-1/2 group-hover:-translate-y-1/2",
    next_button_class: "left-1/2 bottom-0 -translate-x-1/2 group-hover:translate-y-1/2"
  },
};

// Debug code start
watch(selected_index, (newValue, oldValue) => {
  console.log(`Selected index changed from ${oldValue} to ${newValue}`);
})
// Debug code end

onMounted(() => {
  if (emblaApi.value) {
    onInit();
    onSelect();
    emblaApi.value.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect)
  }

  // Debug code start
  console.log(scroll_snaps.value)
  // Debug code end
});
</script>

