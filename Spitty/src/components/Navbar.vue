<template lang="">
  <nav :className="['w-full flex items-center py-5 fixed top 0 z-20 bg-primary ', style.paddingX]">
    <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
      <RouterLink to="/" className="flex items-center gap-2" @click="setActive = '' && window.scrollTo(0,0)">
      <img :src="logos" alt="logo" className="h-9 w-9 object-contain" id="Logo">
      <p className="text-white text-[18px] font-bold cursor-pointer">Scott Pittman</p>
      </RouterLink>
      <ul className="list-none hidden sm:flex flex-row gap-10">
        <li v-for="(links, index) in navLinksObj" :key="`${index}-${links.title}`">{{links.title}}</li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import {  styles } from '../style'
import { navLinks } from '../constants/constans'
import { logo, hisRez, menu, close } from '../assets'

export default {
  setup() {
    let setActive = ref("");
    let style = ref(styles)
    let logos = ref(logo)
    let navLinksObj = ref(navLinks)
    return {
      setActive,
      style,
      logos,
      navLinksObj
    }
  }
}

</script>
<style scoped>

</style>