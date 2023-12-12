<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, Stars} from './components'
// import {ref, onMounted} from 'vue'
// import * as THREE from 'three'
// import { FontLoader } from 'three/addons/loaders/FontLoader.js';
// import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

</script>

<template>
  <header>
  </header>
   <div className="relative z-0 bg-primary">
    <div className="rotate bg-hero-new bg-cover bg-no-repeat bg-center">
      <Navbar />
      <Hero />
    </div>
    <About />
    <Experience />
    <Tech/>
    <Works />
    <Feedbacks />
    <div className="relative z-0">
    <Contact />
    <Stars />
    </div>
   </div>

  <RouterView />
</template>

<style scoped>
</style>