<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import type { User } from "@fusionauth/typescript-client";

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  imageUrl: z.string().url().optional(),
});

type Schema = z.output<typeof schema>;

const { user } = await $fetch<{ user: User }>("/api/fusionauth/user");
let state: User;
if (user) {
  state = reactive(user);
}

async function onSubmit() {
  const { user } = await $fetch<{ user: User }>("/api/fusionauth/user", {
    method: "patch",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: toRaw(state),
  });
}
</script>

<template>
  <UCard>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="First Name" name="firstName">
        <UInput v-model="state.firstName" />
      </UFormGroup>

      <UFormGroup label="Last Name" name="lastName">
        <UInput v-model="state.lastName" />
      </UFormGroup>

      <UFormGroup label="Avatar" name="imageUrl">
        <UInput v-model="state.imageUrl" type="url" />
      </UFormGroup>

      <UButton type="submit"> Submit </UButton>
    </UForm>
  </UCard>
</template>
