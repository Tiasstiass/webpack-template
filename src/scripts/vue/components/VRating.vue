<template>
  <div class="w-full bg-black-900 rounded-[1.875rem] border-0 py-3 inline-flex flex-center tablet:justify-start tablet:px-4">
    <div class="mr-4 inline-flex">
      <v-icon v-for="(data, i) in Math.floor(data.overallRating)" :key="i" icon="star" :height="12" :width="14" color="#151414"></v-icon>
      <v-icon v-if="(this.data.overallRating % 1 !== 0) && data.overallRating <= 4.5" icon="half-star" :height="12" :width="14" color="#151414"></v-icon>
      <v-icon v-for="(data, i) in Math.floor(5- data.overallRating)" :key="i" icon="star" :height="12" :width="14" color="#CCCCCC"></v-icon>
    </div>
    <span class="text-black-200 font-bold border-l border-l-black-700 pl-4">{{ ratingWithDecimals }}</span>
    <span class="text-black-400 pl-1 font-normal leading-4">{{ text }}</span>
  </div>
</template>

<script>
import {product} from '/dist/locales/en.default.json';

export default {
    name: 'VRating',
    props: {
      data: {
        type: Object,
      }
    },
    data() {
      return {
        overallRating: this.data.overallRating,
        ratingWithDecimals: parseFloat(this.data.overallRating).toFixed(1),
        text: product.testimonial.overall_rating
      }
    }
}
</script>