
<template>
  <Container />
</template>

<script setup>
  import Container  from './view/Container.vue'

</script>

<style  lang="scss">

*::-webkit-scrollbar {
  width: 2px !important;
  height: 14px !important;
}

*::-webkit-scrollbar-thumb {
  width: 2px !important;
  height: 14px !important;
  border-radius: 10px !important;
  background-color: rgba($color: #888, $alpha: 0.18) !important;
}
</style>