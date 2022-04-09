<template>
  <div class="flex flex-col min-h-screen text-reg pt-5 pb-10 px-4">

    <!-- top icons -->
    <div class="flex justify-between pb-10">
      <v-image v-if="logo" :image="logo" class="w-[7.5rem] tablet:w-[8.125rem]"/>
      <span v-else>{{ shopName }}</span>

      <div class="flex items-center gap-x-7">
        <button
          type="button" 
          class="modal-trigger cursor-pointer"
          data-modal-id="ajax-cart"
          @click="this.openCart($event)"
        >
          <v-icon icon="cart" :height="20" :width="18"></v-icon>
        </button>

        <button type="button" class="modal-popup__close">
          <v-icon icon="modal-close-btn" :height="24" :width="24"/>
        </button>
      </div>
    </div>

    <!-- menus -->
    <nav class="py-3 border-y border-black-700">
      <ul class="flex justify-between items-center uppercase">
        <template v-for="(title, i) in menuTitles">
          <li
            v-if="title.length != 0"
            @click="index = i"
            class="hover:btn-mega-menu py-1 px-5 mobile:py-2 mobile:px-7"
            :class="index == i && 'btn-mega-menu'"
          >
            {{ title }}
          </li>
        </template>
      </ul>
    </nav>

    <dropdown-item type="megamenu"
      v-for="(link, i) in menus[index]"
      :key="link.url + i"
      class="font-semibold border-b border-black-700"
      :data="[
        {
          title: link.title,
          links: link.sublinks
        }
      ]"
    />
    
    <!-- banners -->
    <div v-if="banners.length > 0" class="flex flex-col pt-6 gap-y-6">
      <div v-for="banner in banners" class="text-reg relative text-white">
        <img 
          v-if="banner.banner_image"
          :src="banner.banner_image"
          :alt="banner.banner_title"
          class="brightness-[0.7] aspect-banner w-full object-cover object-top"
        >
          <div v-if="banner.banner_title" class="absolute w-full p-8 center-center gap-y-4 text-center">
            <span class="block pb-4 capitalize">{{ banner.banner_title }}</span>
            <a 
              v-if="banner.banner_btn_text"
              class="btn btn-light-outline py-2 px-6 inline-flex items-center gap-x-2.5 uppercase"
              :href="banner.banner_btn_url"
            >
              {{ banner.banner_btn_text }}
              <v-icon icon="arrow-left" :height="16" :width="8" color="#fff" flipped></v-icon>
            </a>
          </div>
      </div>
    </div>

    <!-- bottom icons -->
    <div class="mt-auto pt-6">
      <button
        type="button"
        class="block"
      >
        <a :href="accountLink" class="flex-center gap-x-3 pb-6">
          <v-icon icon="account" :height="21" :width="21"/>
          <span class="font-semibold"> {{ accountString }} </span>
        </a>
      </button>

      <div class="flex items-center justify-between">
        <button
            type="button"
          >
            <a :href="loginLink" class="flex-center gap-x-3">
              <v-icon icon="login" :height="24" :width="24"/>
              <span class="font-semibold"> {{ loginString }} </span>
            </a>
        </button>

        <country-picker type="megamenu"/>
      </div>
    </div>
    
  </div>
</template>

<script>
  import { action } from '/dist/locales/en.default.json';

  export default {
    name: 'NavDrawer',
    props: {
      logo: {
        type: String,
        required: false
      },
      menuTitles: {
        type: Array,
        required: true
      },
      menus: {
        type: Array,
        required: true
      },
      banners: {
        type: Array,
        required: false
      }
    },
    methods: {
      openCart(event) {
        if(window.Modals[event.target.attributes['data-modal-id'].value]) {
         window.Modals[event.target.attributes['data-modal-id'].value].open();
        } 
      }
    },
    data() {
      return {
        index: 0,
        accountString: action.account,
        loginString: action.sign_in,
        accountLink: theme.routes.account,
        loginLink: theme.routes.login,
        domainLink: theme.routes.domain,
        currentPathLink: theme.routes.current_path,
        shopName: theme.settings.shop_name
      }
    }
  }
</script>


