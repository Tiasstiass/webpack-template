<!-- 
  Props:
    icon-color: string - eg. #fff
-->

<template>

  <button 
    @click="showPicker = !showPicker"
    class="relative tracking-wider uppercase"
    :class="type === 'header' && 'hidden tablet:block'"
  >
    <div class="flex-center gap-x-2">
      <span v-if="domain.includes('.de')">DE/EUR</span>
      <span v-else-if="domain.includes('.co.uk')">UK/GBP</span>
      <span v-else>Localhost</span>

      <v-icon
        icon="arrow-down"
        :height="8"
        :width="14"
        :color="iconColor"
        :class="showPicker && 'rotate-180 transition-transform duration-200 linear'"
      />


    </div>
    
    <div 
      v-if="showPicker"
      class="absolute center-x bg-white text-black-100 shadow-md w-[130px] divide-y divide-black-700 select-none"
      :class="type === 'header' ? 'top-9' : '-top-25'"
    >
      <div v-if="!domain.includes('.de')" class="p-2.5 hover:bg-black-800">
        <a :href="'https://sanvt.de' + path + '?forcestay=true'">DE/EUR</a>
      </div>
      <div v-if="!domain.includes('.co.uk')" class="p-2.5 hover:bg-black-800">
        <a :href="'https://sanvt.co.uk' + path + '?forcestay=true'">UK/GBP</a>
      </div>
    </div>
  </button>
</template>


<script>
  export default {
    name: 'CountryPicker',
    props: {
      type: {
        type: String,
        default: 'header',
        required: false
      },
      iconColor: {
        type: String,
        default: '#151414',
        required: false
      }
    },
    data() {
      return {
        domain: theme.routes.domain,
        path: theme.routes.current_path,
        showPicker: false
      }
    }
  }
</script>

