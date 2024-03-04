<script setup>

  definePageMeta({
    middleware: ["auth"]
  })

</script>


<template>
  <chatApp />
</template>

<style>

body {
  background-color: #2f2f2f;
}

</style>