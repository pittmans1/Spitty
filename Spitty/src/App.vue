<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import {ref, onMounted} from 'vue'
import * as THREE from 'three'


const navTarget = ref()
let raycaster = new THREE.Raycaster()

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight / 3.75 )
const geometry = new THREE.BoxGeometry(8,5,3)
const material = new THREE.MeshBasicMaterial({ color: '#417571' })
const cube = new THREE.Mesh( geometry, material)
let  pointer = new THREE.Vector2()
scene.add(cube)

camera.position.z = 40

function animate() {
  requestAnimationFrame(animate)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
}
function render() {
  raycaster.setFromCamera(pointer, camera)
  const intersects = raycaster.intersectObjects(scene )

  for (let i = 0;i < intersects.length; i++){
    console.log(intersects[i])
  }
  renderer.render( scene, camera)

}
function raycast(e){
  let rect = renderer.domElement.getBoundingClientRect()
  pointer.x = ((e?.clientX - rect.left) / (rect.width - rect.left) )* 2 -1
  pointer.y = - ((e?.clientY - rect.top) / (rect.bottom - rect.top )) * 2 +1 
}
onMounted(() => {
  navTarget.value.appendChild(renderer.domElement)
  animate()
  window.addEventListener('pointermove', raycast())
  requestAnimationFrame(render)
}) 
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <div ref="navTarget"></div>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
