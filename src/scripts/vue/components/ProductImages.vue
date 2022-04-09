<!-- 
  Props:
    products_options -  object
-->

<template>
  <div v-if="isMobile">
    <splide
      :options="{
        arrows: false,
        pagination: true,
        perPage: 1,
        perMove: 1,
        gap: '1rem',
        mediaQuery: 'min',
        classes: {
          pagination: 'splide__pagination product__pagination-parent',
          page: 'splide__pagination__page product__pagination',
        },
        breakpoints: { 768: { destroy: true } },
      }"
    >
      <splide-slide v-for="(image, i) in images" :key="image.id">
        <v-image
          :image="image.src"
          class="product-img__main w-full object-cover object-top"
        ></v-image>
      </splide-slide>
    </splide>
  </div>

  <template v-else>
    <div class="grid grid-cols-2">
      <v-image
        v-for="(image, i) in images"
        :key="image.id"
        :image="image.src"
        @click="toggler = !toggler"
        class="w-full object-cover object-top cursor-pointer"
        :class="
          i === 0 || i === images.length - 1
            ? 'col-span-full aspect-product'
            : 'col-auto aspect-square'
        "
      ></v-image>
    </div>
  </template>

  <!-- <FsLightbox
    :toggler="toggler"
    :sources="imageArray"
  /> -->
</template>

<script>
// import FsLightbox from "fslightbox-vue/v3";

export default {
  name: 'ProductImages',
  components: { FsLightbox },
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isMobile: false,
      toggler: false,
      imageArray: this.images?.map((data) => {
        return data.src;
      }),
    };
  },
  computed: {
    updateImageArray() {
      this.imageArray = this.images?.map((data) => {
        return data.src;
      });
    },
  },
  methods: {
    getDimensions() {
      this.isMobile = theme.utils.isMobile() ? true : false;
    },
  },
  watch: {
    updateImageArray() {
      this.imageArray;
    },
  },
  mounted() {
    this.getDimensions();
    window.addEventListener('resize', this.getDimensions);
  },
  unmounted() {
    window.removeEventListener('resize', this.getDimensions);
  },
};
</script>
