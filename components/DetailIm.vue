<template>
    <p><span class="font-semibold">{{ label }}:</span> {{ value }}</p>
  </template>
  
  <script setup>
  defineProps(['label', 'value']);
  </script>
  