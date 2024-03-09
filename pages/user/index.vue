<script setup lang="ts">
import type { User } from "@fusionauth/typescript-client";

const { data } = await useFetch<{ user: { users: User[] } }>(
  "/api/fusionauth/user.search"
);
</script>

<template>
  <UContainer class="flex flex-col gap-4">
    <section>
      <h1 class="text-5xl">Users</h1>
      <p class="text-xl">Get User Details</p>
    </section>
    <section class="grid grid-flow-col gap-4">
      <NuxtLink v-for="user in data?.user?.users" :to="`/user/${user.id}`">
        <UCard>
          <p class="text-xl">{{ user?.email }}</p>
        </UCard>
      </NuxtLink>
    </section>
  </UContainer>
</template>
