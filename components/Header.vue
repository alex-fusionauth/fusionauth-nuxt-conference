<script setup lang="ts">
const { status } = useAuth();

const links = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Users",
    to: "/user",
  },
  {
    label: "Comments",
    to: "/comment",
  },
];
</script>

<template #header>
  <section class="p-2 md:px-8 border-primary border-b-2">
    <div class="flex justify-between items-center">
      <NuxtLink to="/"> FusionFun </NuxtLink>
      <section v-if="status === 'authenticated'" class="flex gap-2">
        <!-- <UButton to="/user">Users</UButton>
        <UButton to="/comment">Comments</UButton> -->

        <UHorizontalNavigation
          :links="links"
          class="border-b border-gray-200 dark:border-gray-800"
        />
      </section>
      <AuthSignInButton />
    </div>
  </section>
</template>
