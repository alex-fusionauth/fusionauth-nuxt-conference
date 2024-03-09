<script setup lang="ts">
definePageMeta({ auth: false });
</script>

<template>
  <UContainer class="flex flex-col gap-4">
    <UCard>
      <section class="flex flex-col gap-4">
        <h1 class="text-5xl">Welcome to FusionFun</h1>
        <p class="text-xl">
          This is an admin app where we can learn some things about the API.
        </p>
        <p class="text-xl">
          In this example our entire app is protected by using
          <a class="underline" href="https://authjs.dev/" target="_blank"
            >Auth.js</a
          >
          as part of
          <a
            class="underline"
            href="https://sidebase.io/nuxt-auth/v0.6/getting-started"
            target="_blank"
            >nuxt-auth by sidestream</a
          >.
        </p>
        <section class="grid grid-cols-2 gap-4">
          <NuxtLink to="/unprotected">
            <UCard :ui="{ background: 'bg-red-500 dark:bg-red-500' }">
              <section class="flex flex-col gap-4">
                <p class="text-5xl">Unprotected Page</p>
                <p class="text-xl">
                  You can access this page without logging in.
                </p>
                <p class="text-xl"></p>
              </section>
            </UCard>
          </NuxtLink>
          <NuxtLink to="/comment">
            <UCard :ui="{ background: 'bg-green-500 dark:bg-green-500' }">
              <section class="flex flex-col gap-4">
                <p class="text-5xl">Comment Page</p>
                <p class="text-xl">
                  You can not access this page without logging in.
                </p>
                <p class="text-xl"></p>
              </section>
            </UCard>
          </NuxtLink>
        </section>
      </section>
    </UCard>
  </UContainer>
</template>
