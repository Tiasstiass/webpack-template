<!-- 
  Props:
    data: Array
-->

<template>
  <div 
    @click="isOpen = !isOpen"
    :class="(type === 'footer' || type === 'megamenu' || type === 'social') && 'desktop:cursor-default'"
  >
    <div
      class="flex items-center justify-between" 
      :class="[(type === 'footer' || type === 'social' || type === 'megamenu') ? 'py-6' : 'py-4', (type === 'footer' || type === 'social') && 'desktop:pt-0 desktop:pb-7', (type === 'megamenu') && 'uppercase']" 
      v-for="(data, i) in dropdownData" :key="i"
    >
      <div class="flex-center justify-start gap-5">
        <v-image v-if="data.icon" :image="data.icon" :alt="data.title" class="h-9 w-9"></v-image>
        <span :class="type === 'product' && 'text-reg text-black-100 font-normal'">{{ data.title }}</span>
      </div>
      
      <svg
        v-show="showArrow"
        :class="isOpen && 'rotate-180 transition-all duration-200 linear'"
        xmlns="http://www.w3.org/2000/svg"
        :width="(type === 'footer' || type === 'megamenu' || type === 'social') ? '16' : '19'"
        :height="(type === 'footer' || type === 'megamenu' || type === 'social') ? '8' : '10'"
        viewBox="0 0 16 8"
        :fill="data.iconColor"
      >
        <mask id="path-1-inside-1_1438_3531" fill="white">
          <path d="M0 0L8 8L16 0"/>
        </mask>
        <path d="M1.06066 -1.06066C0.474874 -1.64645 -0.474874 -1.64645 -1.06066 -1.06066C-1.64645 -0.474874 -1.64645 0.474874 -1.06066 1.06066L1.06066 -1.06066ZM8 8L6.93934 9.06066C7.52513 9.64645 8.47487 9.64645 9.06066 9.06066L8 8ZM17.0607 1.06066C17.6464 0.474874 17.6464 -0.474874 17.0607 -1.06066C16.4749 -1.64645 15.5251 -1.64645 14.9393 -1.06066L17.0607 1.06066ZM-1.06066 1.06066L6.93934 9.06066L9.06066 6.93934L1.06066 -1.06066L-1.06066 1.06066ZM9.06066 9.06066L17.0607 1.06066L14.9393 -1.06066L6.93934 6.93934L9.06066 9.06066Z" :fill="data.iconColor" mask="url(#path-1-inside-1_1438_3531)"/>
      </svg>
    </div>

    <Transition>
      <div>
        <div v-if="(type === 'footer' || (type === 'megamenu')) && toggleCollapse">
          <ul 
            v-for="(data,i) in dropdownData" 
            :key="i"
            class="text-black-300"
            :class="(type === 'megamenu') && 'pl-5'"
          >
            <li
              v-for="(link, i) in data.links"
              :key="i"
              class="block mb-6 hover:text-white"
            >
              <a
                :href="link.url"
                class="block mb-6"
                :class="(type === 'megamenu') && 'capitalize hover:text-black-100'"
              >{{ link.title }}</a> 
            </li>
          </ul>
        </div>

        <div v-else-if="(type === 'product') && toggleCollapse">
          <div 
            v-for="(data, i) in dropdownData"
            :key="i"
            class="text-reg text-black-300 ml-14 pb-4"
            v-html="data.description"
          ></div>
        </div>

        <div v-else-if="(type === 'social') && toggleCollapse">
           <div class="flex items-center gap-x-3 mb-6 desktop:gap-x-7.5" v-for="(data,i) in dropdownData" :key="i">
            <a :href="data.facebook">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="15"
                viewBox="0 0 15 24"
                fill="none"
              >
                <path d="M13.5002 1.16699H10.2502C8.81357 1.16699 7.43582 1.73768 6.42 2.7535C5.40418 3.76932 4.8335 5.14707 4.8335 6.58366V9.83366H1.5835V14.167H4.8335V22.8337H9.16683V14.167H12.4168L13.5002 9.83366H9.16683V6.58366C9.16683 6.29634 9.28097 6.02079 9.48413 5.81763C9.6873 5.61446 9.96285 5.50033 10.2502 5.50033H13.5002V1.16699Z" :stroke="data.socialColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a :href="data.instagram">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="26"
                width="26"
                viewBox="0 0 26 26"
                fill="none"
              >
                <path d="M18.4166 2.16666H7.58329C4.59175 2.16666 2.16663 4.59178 2.16663 7.58332V18.4167C2.16663 21.4082 4.59175 23.8333 7.58329 23.8333H18.4166C21.4082 23.8333 23.8333 21.4082 23.8333 18.4167V7.58332C23.8333 4.59178 21.4082 2.16666 18.4166 2.16666Z" :stroke="data.socialColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M17.3333 12.3175C17.467 13.2191 17.313 14.1399 16.8932 14.9489C16.4734 15.758 15.8092 16.414 14.9951 16.8238C14.1809 17.2336 13.2583 17.3762 12.3584 17.2314C11.4585 17.0866 10.6272 16.6617 9.98271 16.0172C9.33821 15.3727 8.91334 14.5414 8.76854 13.6416C8.62374 12.7417 8.76637 11.819 9.17615 11.0049C9.58594 10.1907 10.242 9.52654 11.051 9.10675C11.8601 8.68696 12.7809 8.53296 13.6825 8.66666C14.6021 8.80303 15.4536 9.23158 16.111 9.88899C16.7684 10.5464 17.1969 11.3978 17.3333 12.3175Z" :stroke="data.socialColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.9584 7.04166H18.9692" :stroke="data.socialColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a :href="data.pinterest">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="22"
                width="20"
                viewBox="0 0 20 22"
                fill="none"
              >
                <path d="M7.8881 16.456C8.67666 17.0525 9.84785 17.6 11.625 17.6C13.5012 17.6 15.2841 16.8776 16.755 15.345C18.2268 13.8114 19.0375 11.6936 19.0375 9.37501C19.0374 7.96327 18.7066 6.57119 18.0715 5.31035C17.4365 4.04951 16.5149 2.95497 15.3807 2.11446C14.2464 1.27396 12.931 0.710859 11.5399 0.470307C10.1489 0.229755 8.72076 0.318438 7.37012 0.729247C6.01948 1.14006 4.78387 1.86156 3.76231 2.83594C2.74076 3.81032 1.96168 5.01047 1.48751 6.34019C1.01335 7.66991 0.857296 9.09223 1.03186 10.4931C1.20639 11.8938 1.70657 13.2341 2.49233 14.4067C2.55798 14.5074 2.64309 14.594 2.74267 14.6614C2.84245 14.7289 2.95472 14.7757 3.07289 14.7991C3.19105 14.8226 3.31271 14.8221 3.43069 14.7977C3.54845 14.7734 3.66017 14.7258 3.75927 14.6578C3.85866 14.5912 3.944 14.5057 4.01041 14.4062C4.07694 14.3065 4.12318 14.1946 4.14648 14.0771C4.16979 13.9595 4.1697 13.8385 4.14622 13.7209C4.12274 13.6034 4.07634 13.4916 4.00966 13.392L4.00962 13.392C3.3821 12.4562 2.98255 11.3863 2.84302 10.2683C2.70349 9.15019 2.82784 8.01498 3.20612 6.95364C3.5844 5.8923 4.20607 4.93434 5.02131 4.15657C5.83655 3.37879 6.82267 2.80284 7.90062 2.47487C8.97858 2.14691 10.1184 2.07605 11.2286 2.26799C12.3389 2.45993 13.3888 2.90933 14.2941 3.58015C15.1994 4.25097 15.9349 5.12456 16.4417 6.13088C16.9485 7.1372 17.2125 8.24827 17.2125 9.37501C17.2125 13.3962 14.3591 15.775 11.625 15.775C9.61792 15.775 8.69608 14.8344 8.37105 14.3911L10.077 7.14323L10.0771 7.14281C10.1316 6.90686 10.0901 6.65896 9.96173 6.45362C9.83339 6.24828 9.62874 6.10233 9.3928 6.04788C9.15686 5.99343 8.90895 6.03494 8.70361 6.16328C8.49831 6.29159 8.35238 6.49618 8.29791 6.73207C8.2979 6.73211 8.29789 6.73216 8.29787 6.73221L5.04797 20.5443L5.04789 20.5447C5.02085 20.6615 5.01711 20.7825 5.03687 20.9008C5.05664 21.0191 5.09953 21.1323 5.16309 21.234C5.22666 21.3357 5.30964 21.4239 5.4073 21.4935C5.50497 21.5631 5.61539 21.6128 5.73226 21.6397L5.73211 21.6403L5.74365 21.6416L5.92646 21.6619L5.92638 21.6626L5.93842 21.6625C6.14403 21.6606 6.34313 21.5901 6.50409 21.4622C6.66506 21.3342 6.77868 21.1562 6.8269 20.9563L6.82702 20.9558L7.8881 16.456Z" :fill="data.socialColor" :stroke="data.socialColor" stroke-width="0.2"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </Transition>

  </div>
</template>


<script>
  export default {
    name: 'DropdownItem',
    props: {
      type: {
        type: String,
        required: true
      },
      data: {
        type: Array,
        required: true
      }
    },
    setup(props) {
      const dropdownData = props?.data?.map(data => {
        return {
          iconColor: data.iconColor,
          icon: data.icon,
          title: data.title,
          description: data.description,
          menuBlocks: data.menuBlocks,
          socialColor: data.socialColor,
          facebook: data.facebook,
          instagram: data.instagram,
          pinterest: data.pinterest,
          links: data?.links?.map((link, i) => {
            return {
              url: link.url,
              title: link.title
            }
          })
        }
      });
      return {
        dropdownData
      }
    },
    data() {
      return {
        isOpen: false,
        isDesktop: false
      }
    },
    methods: {
      getDimensions() {
        this.isDesktop = theme.utils.isDevice('largeDesktop') ? true : false
      }
    },
    computed: {
      toggleCollapse() {
        let mobileOnly = this.type === 'footer' || this.type === 'social';
        if(this.isDesktop && mobileOnly) {
          return this.isDesktop
        }
        return this.isOpen;
      },
      showArrow() {
        if (this.type === 'footer' && this.isDesktop || this.type === 'social' && this.isDesktop) {
          return false;
        }
        return true;
      }
    },
    mounted() {
      this.getDimensions()
      window.addEventListener('resize', this.getDimensions);
    },
    unmounted() {
      window.removeEventListener('resize', this.getDimensions);
    }
  }
</script>



