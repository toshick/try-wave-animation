<script setup lang="ts">
  // import Visual from './components/Visual.vue';
  import Three from './components/Three.vue';
</script>

<template>
  <main>
    <div class="Title">
      <h1>Toshick of the world</h1>
      <p>2023.03.04</p>
    </div>

    <!-- <Visual /> -->
    <Three />
  </main>
</template>

<style scoped>
  .Title {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    --color1: orangered;
    --color2: orangered;
    --color3: orangered;
    --color4: orangered;
    text-shadow: 0 0 10px var(--color1), 0 0 20px var(--color2),
      0 0 40px var(--color3), 0 0 80px var(--color4);
    /* filter: saturate(10%); */
  }
  .Title p {
    font-size: 26px;
    text-align: right;
    padding: 0;
    margin: calc(var(--unit) * 1) 0 0;
  }
  h1 {
    white-space: nowrap;
    font-size: 66px;
    padding: 0;
    margin: 0;
  }
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
