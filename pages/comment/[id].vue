<script setup lang="ts">
import type { User, UserComment } from "@fusionauth/typescript-client";

const route = useRoute();
const { data: user } = await useFetch<{ user: User }>("/api/fusionauth/user", {
  query: { id: route.params.id },
});

const getComments = async () => {
  const { data: comments } = await useFetch<UserComment[]>(
    "/api/fusionauth/user.comment",
    {
      query: { id: route.params.id },
    }
  );
  return comments;
};

const updateComments = async () => {
  console.log("updating");
  comments.value = (await getComments()).value;
};
const comments = ref(await getComments());
</script>

<template>
  <UContainer class="flex flex-col gap-4">
    <section class="flex justify-between">
      <h1 class="text-5xl">Comments for: {{ user?.user?.email }}</h1>
      <UserCommentModal @update="updateComments" />
    </section>
    <section class="grid grid-cols-2 gap-4">
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
