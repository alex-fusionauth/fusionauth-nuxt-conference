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

const { data } = await useFetch<{ user: User }>("/api/fusionauth/me/user");
let state: User;
if (data.value?.user) {
  state = reactive(data.value.user);
}

async function onSubmit() {
  const { user } = await $fetch<{ user: User }>("/api/fusionauth/me/user", {
    method: "patch",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: toRaw(state),
  });
  console.log(user);
}
</script>

<template>
  <UCard>
    <section class="flex flex-col gap-8">
      <h1 class="text-5xl">Your User Settings</h1>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
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
    </section>
  </UCard>
</template>
