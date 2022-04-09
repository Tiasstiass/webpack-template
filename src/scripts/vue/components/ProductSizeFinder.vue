<!-- 
  Props:
    isSizesSelected: Boolean to determine if variants pickers are selected
-->

<template>
  <div class="flex items-center mb-6 gap-x-1.5 tablet:gap-x-2.5">

    <p>{{ size_finder }}</p>

    <div @click="showTooltip = !showTooltip" class="relative">
      <v-icon icon="tooltip" :height="18" :width="18" color="#151414"/>
      
      <div 
        v-if="showTooltip"
        class="absolute bottom-[2.5rem] left-[-2.5rem] product-tooltip p-4 bg-black-100 text-white rounded-[1rem] after:content-[''] after:absolute after:top-[100%] after:left-8 after:w-0 after:border-[1.125rem] after:border-transparent after:border-t-black-100"
      >
        <p class="pb-5">{{ tooltip_text }}</p>
        <p>
          <span class="pb-2.5 text-black-400">{{ tooltip_step1 }}</span>
          {{ tooltip_step1_text }}
        </p>
        <p>
          <span class="text-black-400">{{ tooltip_step1 }}</span>
          {{ tooltip_step2_text }}
        </p>
      </div>
    </div>

    <div class="flex ml-auto gap-x-1.5 tablet:gap-x-2.5">
      <template v-if="isSizesSelected">
        <v-icon icon="ruler" :height="20" :width="20" color="#151414"/>
        <button class="underline cursor-pointer">{{ size_finder_title }}</button>
      </template>

      <p v-else class="text-red">{{ size_finder_error }}</p>
    </div>
    
  </div>
</template>

<script>
  import {product} from '/dist/locales/en.default.json';

  export default {
    name: 'ProductSizeFinder',
    props: {
      isSizesSelected: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    data() {
      return{
        showTooltip: false,
        size_finder: product.size_finder,
        size_finder_title: product.size_finder_app,
        size_finder_error: product.size_finder_error,
        tooltip_text: product.size_finder_tooltip_text,
        tooltip_step1: product.size_finder_tooltip_step1,
        tooltip_step1_text: product.size_finder_tooltip_step1_text,
        tooltip_step2: product.size_finder_tooltip_step2,
        tooltip_step2_text: product.size_finder_tooltip_step2_text
      }
    }
  }
</script>