<script setup lang="ts">
import type { User, UserComment } from "@fusionauth/typescript-client";

const route = useRoute();
const { data: user } = await useFetch<{ user: User }>("/api/fusionauth/user", {
  query: { id: route.params.id },
});
</script>

<template>
  <UContainer class="flex flex-col gap-4">
    <section class="flex justify-between"></section>
    <section v-if="user?.user">
      <UCard>
        <template #header>
          <div class="flex justify-between">
            <h1 class="text-5xl">Details for: {{ user?.user?.email }}</h1>
            <UButton to="/user">Back</UButton>
          </div>
        </template>
        <section>
          <pre>{{ user.user }}</pre>
        </section>
      </UCard>
    </section>
  </UContainer>
</template>
