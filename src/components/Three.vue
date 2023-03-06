<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Wave from '../helper/thee-wave';
  import { useWindowSize } from '@vueuse/core';

  const windowSize = useWindowSize();

  const mycanvas = ref(null);

  // const mycanvas2 = ref(null);

  // function initAnime(element: HTMLDivElement) {
  //   const scene = new THREE.Scene();
  //   const camera = new THREE.PerspectiveCamera(
  //     75,
  //     window.innerWidth / window.innerHeight,
  //     0.1,
  //     1000
  //   );

  //   const renderer = new THREE.WebGLRenderer();
  //   // renderer.setSize(element.innerWidth, element.innerHeight);
  //   renderer.setSize(element.clientWidth, element.clientHeight);
  //   element.appendChild(renderer.domElement);

  //   const geometry = new THREE.BoxGeometry(1, 1, 1);
  //   const material = new THREE.MeshBasicMaterial({ color: 0xddff00 });
  //   const cube = new THREE.Mesh(geometry, material);
  //   scene.add(cube);

  //   camera.position.z = 5;
  //   function animate() {
  //     requestAnimationFrame(animate);

  //     cube.rotation.x += 0.01;
  //     cube.rotation.y += 0.01;

  //     renderer.render(scene, camera);
  //   }

  //   animate();
  // }

  onMounted(() => {
    if (mycanvas.value) {
      const { updateSize } = Wave(mycanvas.value, windowSize);

      window.addEventListener('resize', () => {
        updateSize({ width: window.innerWidth, height: window.innerHeight });
        // updatePos(window.innerWidth);
      });
    }
  });
</script>

<template>
  <section>
    width {{ windowSize.width }}
    <div class="MyCanvas" ref="mycanvas"></div>
    <!-- <div class="MyCanvas -second" ref="mycanvas2"></div> -->
  </section>
</template>

<style scoped>
  .MyCanvas {
    height: 400px;
    overflow: hidden;
    margin: 0 auto;
  }
  .MyCanvas.-second {
    position: absolute;
    top: 190px;
  }
</style>
