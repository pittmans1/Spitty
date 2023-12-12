<template lang="">
    <TresCanvas alpha >
        <TresPerspectiveCamera :args="[45,1,0.1,1000]"/>
        <OrbitControls />
        <TresMesh>
            <TresTorusGeometry :args="[1,0.5, 16, 32]" />
            <TresMeshBasicMaterial color="orange" />
        </TresMesh>
        <TresAmbientLight :intensity="1"/>
        <!-- <ContactShadows /> -->
        <!-- <TresDirectionalLight :position="[0,0,0]" :intensity="0.15" cast-shadow/> -->
    </TresCanvas>
</template>
<script setup>
import { Suspense, ref } from 'vue';
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, useGLTF } from '@tresjs/cientos'

// import CanvasLoader from '../Loader.vue'

// const gl = {
//     clearColor: 'black',

// }

// const computer = ref(useGLTF('./desktop_pc/scene.gltf'))

</script>
<style lang="">
    
</style>