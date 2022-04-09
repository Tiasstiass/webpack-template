<!-- 
Props:
  Nothing by default
  Products passed in refresh() method
-->

<template>
  <div v-for="(item, index) in this.items" :key="item.variant_id">
    <cart-products-product
      :item="item"
      :index="index"
      :theme="theme"
      :key="reRenderKey"
    />
  </div>
  <div v-if="this.items.length === 0" v-html="theme.strings.cart_empty"></div>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    this.items = reactive([]);
    return {
      items: items,
      theme: window.theme,
      reRenderKey: Date.now(),
    };
  },
  methods: {
    refresh(products) {
      this.items.splice(0, this.items.length); // clear
      products.forEach((item) => {
        this.items.push(item); // fill
      });
    },
  },
};
</script>
