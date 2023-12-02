<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import {ref, onMounted} from 'vue'
import * as THREE from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const scene = new THREE.Scene()

THREE.Cache.enabled = true;
			// https://threejs.org/docs/index.html#examples/en/loaders/FontLoader			
const textMesh = new THREE.Group( );		
const fontLoader = new FontLoader( );							// see function createText( loadedFont )
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', createText );
textMesh.scale.set( 0.005, 0.005, 0.005 );
textMesh.rotation.y = -0.74 // radiant
textMesh.position.set( 5, 1, 0 );
scene.add( textMesh );

// ----------------------------------------------------------------------------

			// https://en.wikipedia.org/wiki/Canvas_element   https://threejs.org/doc/#api/en/textures/CanvasTexture
const cv = document.createElement( 'canvas' );
cv.width = 10000 //  3 * 512
cv.height = 5000;
const ctx = cv.getContext( '2d' );
ctx.fillStyle = '#fefefe'; 
ctx.fillRect( 0, 0, cv.width, cv.height );
ctx.fillStyle = '#129912';
ctx.textAlign = 'left';
ctx.textBaseline = 'middle';
ctx.font = 'bold 6vh Arial';
			// https://unicode.org/emoji/charts/full-emoji-list.html#1f642 (mark and copy - column Browser)
ctx.fillText( 'three', 0, 100 * cv.height)
const txtGeometry = new THREE.BoxGeometry( 2.4, 0.8, 0.1 ); // w 3 : h 1
const cvTexture = new THREE.Texture( cv );
cvTexture.needsUpdate = true; // otherwise all black only
const spineMat = new THREE.MeshPhongMaterial( { color: 0xa5800e } );
const cvMaterial = new THREE.MeshBasicMaterial( { map: cvTexture  } );
const cvMaterials = [ spineMat, spineMat, spineMat, spineMat, cvMaterial, cvMaterial ]; 
const cvTxtMesh = new THREE.Mesh( txtGeometry, cvMaterials );
cvTxtMesh.rotation.y = 2.4; // radiant
cvTxtMesh.position.set( 0, 0, 15);
scene.add( cvTxtMesh );

function createText( loadedFont ) {
	
	const textMaterial = new THREE.MeshPhongMaterial( { color: 0x0033ff, specular: 0x444444, shininess: 20 } );
	
	const textGeometry = new TextGeometry( 'three.js \nexample', {
		
		font: loadedFont,
		size: 70,
		height: 4,
		curveSegments: 10,
		bevelEnabled: true,
		bevelThickness: 8,
		bevelSize: 8,
		bevelSegments: 5
		
	});
	
	textGeometry.center(); // otherwise position left side
	
	const tMesh = new THREE.Mesh( textGeometry, textMaterial );
	
	textMesh.add( tMesh );
}

const navTarget = ref()
let raycaster = new THREE.Raycaster()

const camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight / 3.75 )
const geometry = new THREE.BoxGeometry(8,5,5)
const material = new THREE.MeshBasicMaterial({ color: '#417571' })
const cube = new THREE.Mesh( geometry, material)
let  pointer = new THREE.Vector2()
scene.background = new THREE.Color('#181818')
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
