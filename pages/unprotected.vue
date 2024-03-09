<script setup lang="ts">
definePageMeta({ auth: false });
</script>
<template>
  <UContainer class="flex flex-col gap-4">
    <UCard>
      <section class="flex flex-col gap-4">
        <h1 class="text-5xl">Hi, I am an Unprotected page.</h1>
      </section>
    </UCard>
  </UContainer>
</template>
