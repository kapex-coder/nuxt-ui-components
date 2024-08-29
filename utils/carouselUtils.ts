export const scrollPrev = (emblaApi: any) => {
  if (!emblaApi.value) return;
  emblaApi.value.scrollPrev();
};

export const scrollNext = (emblaApi: any) => {
  if (!emblaApi.value) return;
  emblaApi.value.scrollNext();
};

