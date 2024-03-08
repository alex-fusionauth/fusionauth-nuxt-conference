<script setup lang="ts">
import type { User } from "@fusionauth/typescript-client";

const route = useRoute();
const { data } = await useFetch<{ user: User }>("/api/fusionauth/user", {
  query: { id: route.params.id },
});
</script>

<template>Comments for: {{ data?.user?.email }}</template>
