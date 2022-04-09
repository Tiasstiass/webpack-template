<template>
  <div class="text-reg hidden tablet:block">

    <!-- menus -->
    <nav class="w-[40vw]">
      <ul class="flex justify-evenly items-center uppercase">
        <template v-for="(title, i) in menuTitles">
          <li
            v-if="title.length > 0"
            @mouseover="[showMegaMenu = true, index = i]"
            class="hover:btn-mega-menu py-2 px-7 cursor-pointer"
            :class="(showMegaMenu == true && index == i) && 'btn-mega-menu'"
          >
            {{ title }}
          </li>
        </template>
      </ul>
    </nav>

    <!-- megamenu modal -->
    <Transition>
      <div
        v-if="showMegaMenu"
        @mouseenter="showMegaMenu = true"
        @mouseleave="showMegaMenu = false"
        class="absolute left-0 mt-5 w-full p-10 bg-white text-black-100"
      >
        <div class="flex justify-between items-start gap-x-26 desktop-xl:max-screen">
          <div class="grid grid-rows-[repeat(2,_auto)] grid-flow-col w-full gap-6">
            <ul v-for="link in menus[index]" class="leading-8 grow first:row-span-2">
              <li class="block mb-4 font-semibold uppercase"> {{ link.title }} </li>
              <li v-for="sublink in link.sublinks">
                <a 
                  :href="sublink.url"
                  class="text-black-300 capitalize hover:text-black-100"
                >
                  {{ sublink.title }}
                </a>
              </li>
            </ul>
          </div>

          <!-- banners -->
          <div v-if="banners.length > 0" class="flex flex-col gap-y-4 desktop-large:flex-row justify-between gap-x-10">
            <div v-for="banner in banners" class="text-reg relative text-white">
              <img 
                v-if="banner.banner_image"
                :src="banner.banner_image"
                :alt="banner.banner_title"
                class="brightness-[0.7] aspect-square h-full max-w-[17.5rem] object-cover object-top !filter-none"
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
        </div>
      </div>
    </Transition>
    
  </div>
</template>

<script>
  export default {
    name: 'NavMegaMenu',
    props: {
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
    data() {
      return {
        index: null,
        showMegaMenu: false,
      }
    }
  }
</script>


