<!-- 
  Props:
    data: array
-->

<template>
  <div class="py-10 desktop-xl:max-screen text-black-100">

    <div class="px-4 tablet:px-10">
      <div class="flex items-center gap-x-6 tablet:gap-x-8 overflow-scroll whitespace-nowrap hide-scrollbar">
        <h4
          v-for="(data, i) in sliderData"
          @click="index = i"
          class="heading-reg block cursor-pointer"
          :class="index == i ? 'text-black-100' : 'text-lightgrey'"
        >
        {{ data.collection_title }}
        </h4>
      </div>
      <a :href="sliderData[index].collection_url" class="view-all pt-2 pb-5 inline-block">View All</a>
    </div>

      <splide :options="{fixedWidth: '94%', pagination: false, perMove: 1, padding: '1rem', gap: '1rem', mediaQuery: 'min', breakpoints: {425: {fixedWidth: '48%', perPage: 2, padding: '2.5rem', gap: '1.25rem'}, 1024: {fixedWidth: '32%', perPage: 3}}}">

        <template #before-track>
          <div class="splide__arrows absolute top-[-2.625rem] right-[1rem] tablet:right-[2.5rem] flex-center gap-9">
            <button class="splide__arrow splide__arrow--prev disabled:opacity-20 disabled:cursor-default">
              <v-icon icon="arrow-left" :height="20" :width="11" color="#151414"></v-icon>
            </button>
            <button class="splide__arrow splide__arrow--next disabled:opacity-20 disabled:cursor-default">
              <v-icon icon="arrow-left" :height="20" :width="11" color="#151414" flipped></v-icon>
            </button>
          </div>
        </template>

        <splide-slide v-for="product in sliderData[index].products" :key="product.id">

          <a :href="product.url">
            <v-image :image="product.image" class="collection-slider__img w-full object-cover object-top"></v-image>
          </a>
          <a :href="product.url">
            <p class="inline-block text-reg my-[1.375rem]">{{ product.title }}</p>
          </a>

          <div class="flex items-baseline justify-end">
            <color-swatch
              v-if="product.options_with_values"
              class="max-w-[62%] mr-auto"
              :product-options="product.options_with_values"
            ></color-swatch>
            <p v-if="sliderData[index].show_prices" class="text-black-100 font-bold">{{ product.price }}</p>
          </div>

        </splide-slide>
      </splide>

  </div>
</template>

<script>
  export default {
    name: 'CollectionSlider',
    props: {
      data: {
        type: Array,
        required: true
      },
    },
    setup(props) {
      const sliderData = props?.data?.map(data => {
        return {
          collection_title: data.collection_title,
          collection_url: data.collection_url,
          show_prices: data.show_prices,
          products: data?.products?.map((product, i) => {
            return {
              id: product.id,
              title: product.title,
              price: theme.Currency.formatMoney(product.price),
              image: product.featured_image,
              url: data.products_url[i],
              options_with_values: data?.products_options[i]?.filter(option => {
                if (option.name.toLowerCase().includes(theme.settings.swatchTrigger)) {
                  return option
                }
                else if (option.name.toLowerCase().includes('colour') && theme.settings.swatchTrigger == 'color') {
                  return option
                }
              }).pop(),
            }
          }),
        }
      })
      return {
        sliderData
      }
    },
    data() {
      return {
        index: 0
      }
    }
  }
</script>

