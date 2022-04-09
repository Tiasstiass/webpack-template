<!-- 
  Props:
    product-options: object - product.options_with_values
-->

<template>
  <div class="flex items-center pt-0.75 pb-4 px-0.75 gap-x-2.5 tablet:gap-x-5 overflow-x-auto snap-x hide-scrollbar">
    <a
      href="/"
      v-for="value in optionsData"
      :style="{ backgroundColor: value.fallback, color: value.fallback, backgroundImage:`url(${value.transformImg()})`}"
      class="h-3.5 min-w-[0.875rem] w-3.5 bg-cover rounded-lg snap-start hover:outline hover:outline-1 hover:outline-offset-2 hover:outline-current"
    >
    </a>
  </div>
</template>

<script>
  export default {
    name: 'ColorSwatch',
    props: {
      productOptions: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      const optionsData = props.productOptions.values.map(value => {
        return {
          color: theme.utils.handleizeString(value),
          fallback: theme.utils.handleizeString(value).split('-').pop(),
          url: theme.settings.image_filter.replace("_small.png", "_50x.png").split('?')[0],
          transformImg() {
            return this.url.replace('black', this.color)
          }
        }
      })
      return {
        optionsData
      }
    }
  }
</script>