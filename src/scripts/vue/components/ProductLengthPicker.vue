<!-- 
  Props:
    products_options -  object
-->

<template>
  <div
    class="mb-4 gap-x-1.5 tablet:gap-x-2.5"
    :class="!instaModal && 'tablet:flex tablet:justify-between tablet:items-baseline'"
  >

    <p class="mb-4">{{ length_string }}</p>
    <div class="flex items-center justify-between tablet:gap-4">
      <button
        v-for="(option, i) in options"
        @click="[setActive(i), $emit('lengthSelected', option)]"
        class="btn"
        :class="i == isSelected ? 'btn-variants__active' : 'btn-variants'"
      >
        {{option}}
      </button>
    </div>
  </div>
</template>

<script>
  import {product} from '/dist/locales/en.default.json';

  export default {
    name: 'ProductLengthPicker',
    props: {
      instaModal: {
        type: Boolean,
      },
      options: {
        type: Array,
        required: true
      }
    },
    emits: ['lengthSelected'],
    data() {
      return {
        length_string: product.length,
        isSelected: undefined
      }
    },
    methods: {
      setActive(i) {
        this.isSelected = i
      }
    }
  }
</script>