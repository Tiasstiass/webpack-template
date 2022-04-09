<!-- 
  Props:
    data: array
    banners-data: array - banner blocks
-->

<template>
  <h4 v-if="data.collection_title" class="heading-reg pb-5">{{ data.collection_title }}</h4>
  
  <div class="grid gap-y-4 gap-x-4 grid-cols-2 tablet:grid-cols-3 tablet:gap-y-8 tablet:gap-x-5">

    <template v-for="item in gridData">
    
      <div v-if="item.type == 'product'">
        <div class="collection-grid__img relative">
          <a :href="item.url">
            <img loading="lazy" :src="item.image" class="absolute inset-0 h-full w-full object-cover object-top">
          </a>
        </div>
        
        <div class="flex-between py-2.5 tablet:py-5">
          <p class="w-3/5 truncate text-black-200 font-semibold">{{ item.title }}</p>
          <p class="text-black-100 font-bold">{{ item.price }}</p>
        </div>
        <color-swatch
          v-if="item.options_with_values"
          class="max-w-[62%] mr-auto"
          :product-options="item.options_with_values"
        ></color-swatch>
      </div>

      <grid-banner v-else :bannerData="item"></grid-banner>
    </template>

  </div>
</template>

<script>

  export default {
    name: 'Collection',
    props: {
      data: {
        type: Array,
        required: true 
      },
      bannersData: {
        type: Array,
        required: false
      }
    },
    setup(props) {
      const gridData = props.data.products.map((data, i) => {
        return { 
          type: 'product',
          id: data.id,
          title: data.title,
          price: theme.Currency.formatMoney(data.price),
          image: data.featured_image,
          variants: data.variants,
          tags: data.tags,
          url: props.data.products_url[i],
          options: data.options,
          options_with_values: props.data?.products_options[i]?.filter(option => {
            if (option.name.toLowerCase().includes(theme.settings.swatchTrigger)) {
              return option
            }
            else if (option.name.toLowerCase().includes('colour') && theme.settings.swatchTrigger == 'color') {
              return option
            }
          }).pop(),
        }
      })
      props.bannersData.forEach(el => {
        if (el.banner_to_bottom) {
          return gridData.push(el)
        }
        else {
          return gridData.splice(el.banner_position - 1, 0, el)
        }
      })
      return {
        gridData
      }
    }
  }
</script>

