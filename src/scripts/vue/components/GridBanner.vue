<!-- 
  Props:
    banner-data: object
-->

<template>
  <div 
    v-if="banner.image"
    class="relative text-white"
    :class="bannerWidth"
  >
    <img :src="banner.image" class="brightness-[0.7] collection-grid__img w-full object-cover object-top">
    <div v-if="banner.title" class="absolute w-full p-8 center-center flex-center flex-col gap-y-7 text-center">
      <span class="heading-reg">{{ banner.title }}</span>
      <a v-if="banner.btn_text" class="btn btn-light-outline" href="btn_url">{{ banner.btn_text }}</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'gridBanner',
    props: {
      bannerData: Object
    },
    setup(props) {
      const banner = {
        title: props.bannerData.banner_title,
        image: props.bannerData.banner_image,
        btn_text: props.bannerData.banner_btn_text,
        btn_url: props.bannerData.banner_btn_url,
        position: props.bannerData.banner_position,
        width: props.bannerData.banner_width,
        to_bottom: props.bannerData.banner_to_bottom
      }
      return {
        banner
      }
    },
    data() {
      let bannerWidth;
      if (this.banner.width == '1') {
          bannerWidth = 'col-span-1'
        }
        else if (this.banner.width == '2') {
          bannerWidth = 'col-span-2'
        }
        else {
          bannerWidth = 'col-span-full'
        }
      return {
        bannerWidth
      }
    }
  }
</script>