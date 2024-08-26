<template>
    <div>
        <Carousel />
        <Carousel>
            <CarouselSlide append-class="bg-red-500 flex-[0_0_100%] md:flex-[0_0_calc(100%/2)] lg:flex-[0_0_calc(100%/3)]">Slide 1</CarouselSlide>
            <CarouselSlide append-class="bg-red-500 flex-[0_0_100%] md:flex-[0_0_calc(100%/2)] lg:flex-[0_0_calc(100%/3)]">Slide 2</CarouselSlide>
            <CarouselSlide append-class="bg-red-500 text-right flex-[0_0_100%] md:flex-[0_0_calc(100%/2)] lg:flex-[0_0_calc(100%/3)]">Slide 3</CarouselSlide>
        </Carousel>
    </div>
</template>

<script setup></script>
