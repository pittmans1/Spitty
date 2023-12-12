<template lang="">
  <section class="relative w-full h-screen mx-auto">
    <div :class="[styles.paddingX, 'absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5']">
      <div class="flex flex-col justify-center items-center mt-5">
        <div class="w-5 h-5 rounded-full bg-[#6dd8f5]"/>
        <div class="w-1 sm:h-80 h-40 violet-gradient"/>
      </div>
      <div>
        <h1 :class="[styles.heroHeadText, 'text-white']">Hi, I'm <span class="text-[#655ef0]">Scott</span><span class="text-[#32C732]"> (Spitty)</span></h1>
        <p :class="['mt-2 text-white-100', styles.heroSubText]">I develop web applications <br class="sm:block hidden"/> and make dreams a reality</p>
      </div>
    </div>
    <ComputersCanvas />
  </section>
</template>
<script setup>
import { styles } from '../style';
import { ComputersCanvas } from './canvas'
</script>
<style lang="">
  
</style>