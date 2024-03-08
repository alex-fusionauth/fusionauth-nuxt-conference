<script setup lang="ts">
import type { User, UserComment } from "@fusionauth/typescript-client";

const route = useRoute();
const { data: user } = await useFetch<{ user: User }>("/api/fusionauth/user", {
  query: { id: route.params.id },
});
const { data: comments } = await useFetch<UserComment[]>(
  "/api/fusionauth/user.comment",
  {
    query: { id: route.params.id },
  }
);
</script>

<template>
  <UContainer class="flex flex-col gap-4">
    <section>
      <h1 class="text-5xl">Comments for: {{ user?.user?.email }}</h1>
    </section>
    <section class="grid grid-flow-col gap-4">
      <UCard v-for="comment in comments">
        <template #header>
          <div class="flex justify-between">
            <div>Commenter: {{ comment?.commenterId }}</div>
            <div v-if="comment.insertInstant">
              {{ new Date(comment.insertInstant) }}
            </div>
          </div>
        </template>
        <p class="text-xl">{{ comment?.comment }}</p>
      </UCard>
    </section>
  </UContainer>
</template>
