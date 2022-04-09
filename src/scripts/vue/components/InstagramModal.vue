<template>
  <button type="button" class="modal-popup__close absolute !top-4 right-4">
    <v-icon icon="modal-close-btn" :height="24" :width="24"/>
  </button>
    
  <div class="w-full flex flex-col tablet:flex-row">
    <div class="w-full tablet:basis-3/5 relative">
      <v-image 
        :key="item.image"
        :image="item.image_modal ? item.image_modal : item.image"
        class="max-h-[50rem] aspect-insta-modal object-cover w-full h-full"
      />
      
      <button
        v-for="(marker, i) in item.products.length"
        @click="index = i"
        class="marker absolute bg-white rounded-lg h-4 w-4"
        :class="index === i && 'pulse-anim'"
        :style="{top: `${item.products[i].hotspot_vertical}%`, left: `${item.products[i].hotspot_horizontal}%`}"
      >
      </button>

    </div>
    <div class="w-full text-reg tablet:basis-2/5 p-4 max-w-lg tablet:max-w-full mx-auto tablet:py-15 tablet:px-10">

      <!-- title & price -->
      <div class="flex justify-between items-center mb-4 tablet:mb-5">
        <div class="flex gap-2">
          <v-icon icon="instagram" color="#151414" :height="22" :width="22"></v-icon>
          <h2 :key="item.products[index].item.id" class="font-bold text-reg">{{ item.products[index].item.title }}</h2>
        </div>
        <span>{{ variantPrice }}</span>
      </div>

      <!-- description -->
      <p class="mb-4 text-black-400">this is the product description, we should use metafields for it</p>

      <!-- color swatches -->
      <div class="flex items-center justify-between mb-6">
        <span>{{ colorString }}</span>

        <div class="flex items-center gap-x-5">
          <div
            v-for="swatch in this.swatchData"
            @click="updateColor(swatch)"
            :style="{ backgroundColor: swatch.fallback, color: swatch.fallback, backgroundImage:`url(${swatch.url})`}"
            class="h-3.5 min-w-[0.875rem] w-3.5 bg-cover rounded-lg snap-start cursor-pointer hover:outline hover:outline-1 hover:outline-offset-2 hover:outline-current"
            :class="selectedColor === swatch.color ? 'outline outline-1 outline-offset-2 outline-current' : ''"
          ></div>
        </div>
      </div>

      <!-- size-finder -->
      <product-size-finder
        :is-sizes-selected="(selectedWidth && selectedLength) ? true : false"
      /> 

      <!-- width picker -->
      <product-width-picker
        insta-modal
        @widthSelected="updateWidth"
        :options="widthOptions.values"
      />

      <!-- length picker -->
      <product-length-picker
        insta-modal
        @lengthSelected="updateLength"
        :options="lengthOptions.values"
      />

      <!-- add to cart button -->
      <form>
        <div>
          <button
            type="button"
            name="add"
            class="btn btn-dark w-full mt-6 mb-4"
            :disabled="!variantAvailability || !(selectedWidth && selectedLength)"
            :data-product-id="variantId"
            :data-product-price="variantPrice"
            @:click="addVariantToCart($event)"
          >
            {{ this.variantAvailability ? addToCartString : soldOutString }}
          </button>
        </div>

        <input type="hidden" name="id" :value="variantId"/>
      </form>

    </div>
  </div>

</template>

<script>
  import {product, action, common} from '/dist/locales/en.default.json';

  export default {
    name: 'InstagramModal',
    props: {
      settings: {
        type: Object
      },
      data: {
        type: Object
      }
    },
    data() {
      return {
        item: this.data,
        index: 0,
        colorString: product.color,
        selectedColor: undefined,
        selectedWidth: undefined,
        selectedLength: undefined,
        variantId: undefined,
        variantAvailability: true,
        variantPrice: theme.Currency.formatMoney(this.data.products[0].item.price),
        addToCartString: action.add_to_cart,
        soldOutString: common.sold_out,
      }
    },
    computed: {
      colorOptions() {
        return this.data.products[this.index].options_with_values.filter(option => {
          if (option.name.toLowerCase().includes(product.color_swatch_trigger.toLowerCase())) {
            return option
          } else if (option.name.toLowerCase().includes('colour') && product.color_swatch_trigger.toLowerCase() == 'color') {
            return option
          }
        }).pop()
      },
      swatchData() {
        return this.colorOptions.values.map(color => {
          return {
            color: theme.utils.handleizeString(color),
            fallback: theme.utils.handleizeString(color).split('-').pop(),
            url: theme.settings.image_filter.replace("black_small.png", `${theme.utils.handleizeString(color)}_50x.png`).split('?')[0],
          }
        })
      },
      widthOptions() {
        return this.data.products[this.index].options_with_values.filter(option => option.name.toLowerCase().includes(product.size.toLowerCase())).pop()
      },
      lengthOptions() {
        return this.data.products[this.index].options_with_values.filter(option => option.name.toLowerCase().includes(product.length.toLowerCase())).pop()
      },
      updateModal() {
        return this.item = this.data
      }
    },
    methods: {
      updateVariant() {
        this.variantId = this.data.products[this.index].item.variants.filter(el => {
          return theme.utils.handleizeString(el.title).includes(this.selectedColor)
          && el.title.toLowerCase().split(" / ").includes(this.selectedWidth)
          && el.title.toLowerCase().split(" / ").includes(this.selectedLength)
        }).map(el => el.id).pop();

        updateAvailability = () => {
          this.data.products[this.index].item.variants.filter(el => {
            return el.id === this.variantId
          }).map(el => {
            return this.variantAvailability = el.available
          })
        }
        updateAvailability()

        updatePrice = () => {
          this.data.products[this.index].item.variants.filter(el => {
            return el.id === this.variantId
          }).map(el => {
            return this.variantPrice = theme.Currency.formatMoney(el.price)
          })
        }
        updatePrice()
      },

      updateColor(swatch) {
        this.selectedColor = swatch.color
        this.updateVariant();
      },
      updateWidth(option) {
        this.selectedWidth = option.toLowerCase()
        this.updateVariant();
      },
      updateLength(option) {
        this.selectedLength = option.toLowerCase();
        this.updateVariant();
      },
      addVariantToCart(event) {
        return theme.cart.addItem(event.target)
      },
    },
    watch: {
      updateModal() {
        this.productsItem
      }
    },
  }
</script>
