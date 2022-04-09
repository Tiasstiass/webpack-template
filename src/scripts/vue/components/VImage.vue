<!--
  Props:
    image (required): image source
    mobile-image (optional) - mobile image source
---------------------------------------------------------------------------------------------
    @accepted image formats:
      - JPEG / JPG
---------------------------------------------------------------------------------------------
    @default media sources
      - Mobile: 319x, 374x, 424x
      - Tablet: 767x, 1023x, 1439x
      - Desktop: 1599x, 1679x, 1919x, 2159x, 2303x, 2559x, 2879x, 2999x, 3839x, 4095x
---------------------------------------------------------------------------------------------
 -->

<template>
  <picture>

    <template v-if="this.imageMobile">
      <source
        v-for="image in this.imageMobile"
        type="image/webp"
        :media="`(max-width: ${image.width}px)`"
        :srcset="`${image.source} 1x, ${image.sourceRetina} 2x`"
      >
    </template>
      <source
        v-for="image in this.imageTabletUp"
        type="image/webp"
        :media="`(max-width: ${image.width}px)`"
        :srcset="`${image.source} 1x, ${image.sourceRetina} 2x`"
      >

      <img
        :src="image"
        alt=""
        height="auto"
        width="auto"
        :class="$attrs.class"
      >
  </picture>
</template>

<script>
  export default {
    name: 'VImage',
    props: {
      image: {
        type: String,
        required: true
      },
      mobileImage: {
        type: String,
        required: false
      }
    },
    setup(props) {
      const srcMobile = [319, 374, 424, 767];
      const srcTabletUp = [1023, 1365, 1439, 1599, 1679, 1919, 2159, 2303, 2559, 2879, 2999, 3839, 4095]

      const imageMobile = srcMobile.map(src => {
        return {
          source: props?.imageMobile 
          ? props.imageMobile.replace(".jpg", `_${src}x.jpg`).split('?')[0] 
          : props.image.replace(".jpg", `_${src}x.jpg`).split('?')[0],
          sourceRetina: props?.imageMobile
          ? props.imageMobile.replace(".jpg", `_${src}x@2x.jpg`).split('?')[0]
          : props.image.replace(".jpg", `_${src}x@2x.jpg`).split('?')[0],
          width: src
        }
      })
      const imageTabletUp = srcTabletUp.map(src => {
        return {
          source: props.image.replace(".jpg", `_${src}x.jpg`).split('?')[0],
          sourceRetina: props.image.replace(".jpg", `_${src}x@2x.jpg`).split('?')[0],
          width: src
        }
      })
      return {
        imageMobile,
        imageTabletUp
      }
    },
    // mounted() {
    //   console.log('image:', this.image)
    //   console.log('mobile image:', this.mobileImage)
    // }
  }
</script>