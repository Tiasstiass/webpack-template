<template>
  <button class="p-6 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white" @click="plus">
    You clicked me {{ count }} times.
  </button>
  <slot></slot>
</template>

<script>
// Define a new local component called button-counter
  export default {
    name: 'ButtonCounter',
    data() {
      return {
        count: 0
      }
    },
    methods: {
      plus() {
        this.count++
      }
    }
  }
</script>


