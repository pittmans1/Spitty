<template lang="">
  <nav :className="['w-full flex items-center py-5 fixed top 0 z-20 bg-primary ', style.paddingX]">
    <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
      <RouterLink to="/" className="flex items-center gap-2" @click="setActive.value = '' && window.scrollTo(0,0)">
      <img :src="logos" alt="logo" className="h-9 w-9 object-contain" id="Logo">
      <p className="text-white text-[18px] font-bold cursor-pointer">Scott Pittman &nbsp;</p>
      </RouterLink>
      <ul className="list-none hidden sm:flex flex-row gap-10">
        <li v-for="(links, index) in navLinksObj" :class="[getClasses(links.title),' hover:text-white text-[18px] font-medium cursor-pointer']" @click="setActive.value = links.title" :key="`${index}-${links.title}`"> <a :href="links.id">{{links.title}}</a></li>
      </ul>
      <div class="sm:hidden flex flex-1 justify-end items-center">
        <img v-if="toggledMenu" :src="closeImage" alt="menu" class="w-[28px] h-[28px] object-contain cursor-pointer" @click="toggleMenu()">
        <img v-else :src="menuImage" alt="menu" class="w-[28px] h-[28px] object-contain cursor-pointer" @click="toggleMenu()">
        <div :class="[!toggledMenu ? 'hidden' : 'flex', 'p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-2[140px] z-10 rounded-xl']">
          <ul className="list-none flex justify-end items-start flex-col gap-10">
            <li v-for="(links, index) in navLinksObj" :class="[getClasses(links.title),' hover:text-white text-[18px] font-medium cursor-pointer']" @click="setActive.value = links.title && toggleMenu()" :key="`${index}-${links.title}`"> <a :href="links.id">{{links.title}}</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { ref, onMounted, computed, reactive } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import {  styles } from '../style'
import { navLinks } from '../constants/constans'
import { logo, hisRez, menu, close } from '../assets'

export default {
  setup() {
    const route = useRoute()
    let setActive = computed(() => route.path)
    let mobileSrc = computed(() => {
      return toggledMenu.value ? close : menu
    })
    let style = ref(styles)
    let toggledMenu = ref(false)
    let logos = ref(logo)
    let menuImage = ref(menu)
    let navLinksObj = ref(navLinks)
    let closeImage = ref(close)
    const toggleMenu = () => {
      console.log(toggledMenu.value)
      toggledMenu.value = !toggledMenu.value
      console.log(toggledMenu.value)
    }
    const getClasses = (title) => {
      console.log(title, setActive.value)
      return {
        'is--active': setActive.value === `/${title.toLowerCase()}`,
        'isnt--active': setActive.value !== `/${title.toLowerCase()}`,

      }
    }
    return {
      setActive,
      closeImage,
      mobileSrc,
      getClasses,
      toggledMenu,
      style,
      toggleMenu,
      logos,
      navLinksObj,
      menuImage
    }
  },
  onMounted () {

  }
}

</script>
<style scoped>
.is--active {
  color: white;
}
.isnt--active{
  color: rgb(170 166 195 / 1);
  
}
.isnt--active:hover{
  color: white;
}
</style>