<template>
<div class="w-full pt-9 pb-20" :style="`background-color: ${settings.bg_color}`">

  <div class="max-screen items-center">

    <div class="flex flex-col desktop:flex-row desktop:justify-between px-4 tablet:px-10 pb-6">
      <h2 v-if="settings.title" class="text-black-100 uppercase pb-2">{{ settings.title }}</h2>

      <a v-if="settings.link_text" class="flex items-center gap-x-4 text-reg uppercase" :href="insta_link">
        <v-icon icon="instagram" :height="26" :width="26" color="#151414"></v-icon>
        {{ settings.link_text }}
      </a>
    </div>

    <splide :options="{fixedWidth: '94%', pagination: false, arrows: false, perMove: 1, padding: '1rem', gap: '1rem', mediaQuery: 'min', breakpoints: {425: {fixedWidth: '47%'}, 768: {fixedWidth: '32%', padding: '2.5rem', gap: '1.25rem'}, 1200: {fixedWidth: 'calc(20% - 1rem)', drag: false}}}">
      <template v-for="(product, i) in data" :key="i">

        <splide-slide>
          <v-image v-if="product.image" :image="product.image"
            class="aspect-slider desktop-large:aspect-square relative object-cover object-top w-full"
          />

          <button 
            type="button" 
            class="modal-trigger absolute top-4 right-4"
            data-modal-id="insta-quick-buy"
            @click="[this.openModal($event), index = i]"
          >
            <v-icon icon="instagram-basket" :height="24" :width="24"/>
          </button>
        </splide-slide>
      </template>

    </splide>
  </div>

  <Teleport to="#instaModal">
    <instagram-modal :data="data[index]"></instagram-modal>
  </Teleport>
    
  </div>
</template>

<script>
  export default {
    name: 'InstagramGrid',
    props: {
      settings: {
        type: Object
      },
      data: {
        type: Array
      }
    },
    data() {
      return {
        index: 0,
        insta_link: theme.settings.instagram_link
      }
    },
    methods: {
      openModal(event) {
        if(window.Modals[event.target.attributes['data-modal-id'].value]) {
         window.Modals[event.target.attributes['data-modal-id'].value].open();
        } 
      }
    },
  }
</script>
