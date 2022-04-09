<!-- 
Props:
  item - cart product object
  theme - theme object
-->

<template>
  <div 
    :id="'cart-item__' + item.variant_id"
    class="flex justify-between gap-5 skeleton-loading"
  >
    <div>
      <img
        :alt="item.title"
        :src="item.image.replace('.jpg', '_73x.jpg')"
        width="73"
      />
    </div>
    <div class="flex-auto">
      <div class="">{{ item.title.split('-')[0] }}</div>
      <div class="">
        <div 
          v-for="(option, index) in item.options_with_values"
          :key="index"
        >
          <span class="text-black-400">{{ option.name }}:</span>
          {{ option.value }}
        </div>
      </div>
    </div>
    <div class="text-right flex flex-col gap-[5px]">
      <div 
        class="cursor-pointer text-black-500"
        @click="updateCartItem(item, 0)"
      >
        <v-icon icon="close-btn" :height="12" :width="12" color="#B3B3B3" class="inline align-baseline"></v-icon>
      </div>

      <div 
        class="font-bold"
        v-html="theme.Currency.formatMoney(item.line_price)"
      ></div>

      <div
        v-if="item.line_price < item.original_line_price"
        class=""
        v-html="theme.Currency.formatMoney(item.original_line_price)"
      ></div>

      <div class="">
        <product-qty 
          :product="item"
          :key="reRenderKey"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { watch } from 'vue'

  export default {
    props: {
      item: Object,
      theme: Object
    },
    data(props) {
      watch(() => props.item, (updated) => {
        this.reRender();
      });
      return {
        reRenderKey: Date.now(),
      }
    },
    methods: {
      updateCartItem(item, qty) {
        const cart_item = document.getElementById("cart-item__" + item.variant_id);
        if(cart_item) {
          cart_item.parentElement.classList.add("loading");
        }
        theme.cart.changeItem(item.variant_id, qty).then((cart) => {
          theme.cart.updateAjaxCart(cart);
          if(cart_item) {
            cart_item.parentElement.classList.remove("loading");
          }
        });
      },
      reRender() {
        this.reRenderKey = Date.now();
      }
    }
  }
</script>