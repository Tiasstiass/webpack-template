<!-- 
  Props:
    variants: array
-->

<template>
  <div class="tablet:flex tablet:gap-5">
    <div class="basis-[49rem]">
      <!-- gallery -->
      <product-images
        v-for="block in blocks.filter((el) => el.type === 'gallery')"
        :images="
          product.media.filter((image) => image.src.includes(selectedColor))
        "
      ></product-images>
    </div>

    <div
      class="sticky top-[3.875rem] h-fit max-w-xl grow mx-auto px-4 basis-2/5 tablet:px-0"
    >
      <template v-for="block in blocks">
        <!-- title -->
        <h1 v-if="block.type === 'title'" class="mt-4 mb-2 tablet:mt-0">
          {{ product.title }}
        </h1>

        <!-- review badge -->
        <product-review-badge
          v-if="block.type === 'review-badge'"
          :rating="block.settings.average_rating"
          :numberOfReviews="block.settings.number_reviews"
        />

        <!-- price -->
        <div v-if="block.type === 'price'">
          <h2 class="mb-4">{{ variantPrice }}</h2>
        </div>

        <!-- color swatches -->
        <div
          v-if="block.type === 'color-picker'"
          class="flex items-center justify-between mb-6"
        >
          <div>
            <span class="border-r-[1.5px] border-black-600 pr-2.5">{{
              colorString
            }}</span>
            <span class="inline-block capitalize text-black-600 pl-2.5">{{
              selectedColor
            }}</span>
          </div>

          <div class="flex items-center gap-x-5">
            <div
              v-for="swatch in swatchData"
              @click="updateColor(swatch)"
              :style="{
                backgroundColor: swatch.fallback,
                color: swatch.fallback,
                backgroundImage: `url(${swatch.url})`,
              }"
              class="h-3.5 min-w-[0.875rem] w-3.5 bg-cover rounded-lg snap-start cursor-pointer hover:outline hover:outline-1 hover:outline-offset-2 hover:outline-current"
              :class="
                selectedColor === swatch.color
                  ? 'outline outline-1 outline-offset-2 outline-current'
                  : ''
              "
            ></div>
          </div>
        </div>

        <!-- size-finder -->
        <product-size-finder
          v-if="block.type === 'size-finder'"
          :is-sizes-selected="selectedWidth && selectedLength"
        />

        <!-- dropdowm -->
        <dropdown-item
          type="product"
          v-if="block.type === 'dropdown'"
          :data="[
            {
              title: block.settings.title,
              description: block.settings.description,
              icon: block.settings.icon,
              iconColor: '#15144',
            },
          ]"
        />

        <!-- width picker -->
        <product-width-picker
          v-if="block.type === 'width-picker'"
          @widthSelected="updateWidth"
          :options="widthOptions.values"
        />

        <!-- length picker -->
        <product-length-picker
          v-if="block.type === 'length-picker'"
          @lengthSelected="updateLength"
          :options="lengthOptions.values"
        />

        <!-- add to cart button -->
        <form>
          <div v-if="block.type === 'add-to-cart-btn'">
            <button
              type="button"
              name="add"
              class="btn btn-dark w-full mt-6 mb-10"
              :disabled="
                !variantAvailability || !(selectedWidth && selectedLength)
              "
              :data-product-id="variantId"
              :data-product-price="variantPrice"
              @click="addVariantToCart($event)"
            >
              <span class="pointer-events-none">
                {{ this.variantAvailability ? addToCartString : soldOutString }}
              </span>
            </button>
          </div>

          <input type="hidden" name="id" :value="variantId" />
        </form>

        <!-- description -->
        <p
          v-if="block.type === 'description'"
          v-html="product.description"
          class="mb-10"
        ></p>
      </template>
    </div>
  </div>
</template>

<script>
import { product, action, common } from '/dist/locales/en.default.json';

export default {
  name: 'Product',
  props: {
    blocks: {
      type: Array,
      required: true,
    },
    product: {
      type: Object,
      required: true,
    },
    productOptions: {
      type: Object,
      required: false,
    },
  },
  setup(props) {
    const colorOptions = props.productOptions
      .filter((option) => {
        if (
          option.name
            .toLowerCase()
            .includes(product.color_swatch_trigger.toLowerCase())
        ) {
          return option;
        } else if (
          option.name.toLowerCase().includes('colour') &&
          product.color_swatch_trigger.toLowerCase() == 'color'
        ) {
          return option;
        }
      })
      .pop();

    const swatchData = colorOptions.values.map((color) => {
      return {
        color: theme.utils.handleizeString(color),
        fallback: theme.utils.handleizeString(color).split('-').pop(),
        url: theme.settings.image_filter
          .replace(
            'black_small.png',
            `${theme.utils.handleizeString(color)}_50x.png`
          )
          .split('?')[0],
      };
    });

    const widthOptions = props.productOptions
      .filter((option) =>
        option.name.toLowerCase().includes(product.width.toLowerCase())
      )
      .pop();
    const lengthOptions = props.productOptions
      .filter((option) =>
        option.name.toLowerCase().includes(product.length.toLowerCase())
      )
      .pop();

    return {
      swatchData,
      widthOptions,
      lengthOptions,
    };
  },
  data() {
    return {
      selectedColor: this.swatchData[0].color,
      selectedWidth: undefined,
      selectedLength: undefined,
      variantId: undefined,
      variantAvailability: true,
      variantPrice: theme.Currency.formatMoney(this.product.price),
      colorString: product.color,
      addToCartString: action.add_to_cart,
      soldOutString: common.sold_out,
    };
  },
  methods: {
    updateVariant() {
      this.variantId = this.product.variants
        .filter((el) => {
          return (
            theme.utils
              .handleizeString(el.title)
              .includes(this.selectedColor) &&
            el.title.toLowerCase().split(' / ').includes(this.selectedWidth) &&
            el.title.toLowerCase().split(' / ').includes(this.selectedLength)
          );
        })
        .map((el) => el.id)
        .pop();

      updateAvailability = () => {
        this.product.variants
          .filter((el) => {
            return el.id === this.variantId;
          })
          .map((el) => {
            return (this.variantAvailability = el.available);
          });
      };
      updateAvailability();

      updatePrice = () => {
        this.product.variants
          .filter((el) => {
            return el.id === this.variantId;
          })
          .map((el) => {
            return (this.variantPrice = theme.Currency.formatMoney(el.price));
          });
      };
      updatePrice();
    },

    updateColor(swatch) {
      this.selectedColor = swatch.color;
      this.updateVariant();
    },
    updateWidth(option) {
      this.selectedWidth = option.toLowerCase();
      this.updateVariant();
    },
    updateLength(option) {
      this.selectedLength = option.toLowerCase();
      this.updateVariant();
    },
    addVariantToCart(event) {
      return theme.cart.addItem(event.target);
    },
  },
  // mounted() {
  // console.log('block-type:', this.blocks);
  // console.log('product:', this.product);
  // console.log('product-options:', this.productOptions);
  // }
};
</script>
