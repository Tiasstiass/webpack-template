<!-- 
  Props:
    data object
-->

<template>

  <div class="flex items-center mb-4 text-black-500">
    
    <p class="pr-2.5 tablet:pr-4 border-r-[1.5px] border-black-500 underline underline-offset-1">
      <span>{{ numberOfReviews }}</span>
      {{ reviews_string }}
    </p>

    <div class="flex items-center justify-between gap-0.5">
      <span class="pl-2.5 tablet:pl-4 pr-1 underline underline-offset-1">{{average_rating_display}}</span>
      <v-icon v-for="star in rating" icon="star" :height="12" :width="14" color="#151414"/>
      <v-icon v-for="star in (5 - rating)" icon="star" :height="12" :width="14" color="#CCCC"/>
    </div>

  </div>

</template>

<script>
  import {product} from '/dist/locales/en.default.json';

  export default {
    name: 'ProductReviewBadge',
    props: {
      rating: {
        type: Number,
        required: true
      },
      numberOfReviews: {
        type: String,
        required: true
      }
    },
    data() {
      return{
        reviews_string: product.reviews,
        average_rating_display: this.rating.toFixed(1),
      }
    }
  }
</script>