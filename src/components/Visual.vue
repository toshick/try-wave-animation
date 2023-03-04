<script setup lang="ts">
  import { reactive } from 'vue';
  import { Point, getWavePoints } from '../helper/point';

  const points = Array.from(Array(5)).map((_, index: number) => {
    return getWavePoints(index * 14, index * 20 + 200);
  });
  const itemsList: Point[][] = reactive(points);
</script>

<template>
  <section>
    <ul class="Wave" v-for="points in itemsList">
      <li
        v-for="p in points"
        :style="{
          left: `${p.x}px`,
          top: `${p.y}px`,
          '--delay-ms': `${p.delay}ms`,
        }"
        class="Wave__Item"
      ></li>
    </ul>
  </section>
</template>

<style scoped>
  h1 {
    margin: 0;
  }
  section {
    position: relative;
    width: 100%;
    height: 600px;
    background-color: #ccc;
    overflow: hidden;
  }
  .Wave {
    list-style: none;
  }
  .Wave__Item {
    --delay-ms: 0ms;
    position: absolute;
    animation: float 3s ease-in-out infinite;
    animation-delay: var(--delay-ms);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: white;
  }
  @keyframes float {
    0% {
      box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
      transform: translatey(0px);
    }
    50% {
      box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
      transform: translatey(-10px);
    }
    100% {
      box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
      transform: translatey(0px);
    }
  }
</style>
