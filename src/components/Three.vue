<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Wave from '../helper/thee-wave';

  const mycanvas = ref(null);
  onMounted(() => {
    if (mycanvas.value) {
      const { updateSize } = Wave(mycanvas.value);
      window.addEventListener('resize', () => {
        updateSize({ width: window.innerWidth, height: window.innerHeight });
      });
    }
  });
</script>

<template>
  <section>
    <div class="MyCanvas" ref="mycanvas"></div>
  </section>
</template>

<style scoped>
  .MyCanvas {
    height: 400px;
    overflow: hidden;
    margin: 0 auto;
  }
</style>
