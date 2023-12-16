<template>
  <div class="container-fluid" style="padding-top:22px">
    <div class="copyright float-right">
      &copy;
      {{ date }}, {{ $t('text.goforgame') }}
      <a href="https://www.chessofstars.io" target="_blank">Game</a>.
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const date = ref(new Date().getFullYear())
</script>

<style>
</style>