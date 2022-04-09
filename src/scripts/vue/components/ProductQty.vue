<!-- 
Props:
  product - product object
-->

<template>
  <div class="product-qty flex border border-lightgrey divide-x divide-lightgrey">
    <div 
      class="text-black-400 text-large font-bold 
        cursor-pointer leading-[2.3125rem] w-[2.0625rem] h-[2.0625rem] 
        flex justify-center text-center"
      @click="updateInput('minus', product)"
    >-</div>
    <input 
      class="w-[2.0625rem] h-[2.0625rem] 
        flex justify-center text-center" 
      min="0" 
      :value="product.quantity" 
      onkeypress="return event.charCode >= 48 && event.charCode <= 57"
      @input="e => updateCartItem(product, e.target.value)"
      ref="input"
    />
    <div 
      class="text-black-400 text-large font-bold 
        cursor-pointer leading-[2.3125rem] w-[2.0625rem] h-[2.0625rem] 
        flex justify-center text-center"
      @click="updateInput('plus', product)"
    >+</div>
  </div>
</template>

<script>
  export default {
    props: {
      product: Object,
    },
    setup(props) {
      return {
        ...props,
        reRenderKey: Date.now() 
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
          // fix and issue with updating line item price
          document.getElementById("ajaxCart").querySelectorAll(".cart-product__price").forEach((el, index) => {
            el.innerHTML = theme.Currency.formatMoney(cart.items[index]?.line_price);
          });
        });
      },
      updateInput(direction, product) {
        const input = this.$refs.input;
        if(direction == "plus") {
          input.value = parseInt(input.value) + 1;
        }
        else {
          input.value = parseInt(input.value) - 1;
        }
        this.updateCartItem(product, input.value);
      }
    }
  }
</script>
