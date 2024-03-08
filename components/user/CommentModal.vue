<script setup lang="ts">
const emit = defineEmits(["update"]);
const isOpen = ref(false);
const isSubmitting = ref(false);

import { z } from "zod";
import type { User } from "@fusionauth/typescript-client";
const route = useRoute();

const schema = z.object({
  comment: z.string(),
});

const state = reactive({
  comment: "",
  userId: route.params.id,
});

async function onSubmit() {
  isSubmitting.value = true;
  const { user } = await $fetch<{ user: User }>(
    "/api/fusionauth/me/user.comment",
    {
      method: "POST",
      body: toRaw(state),
    }
  );
  isSubmitting.value = false;
  isOpen.value = false;
  emit("update");
}
</script>

<template>
  <div>
    <UTooltip text="Add Comment">
      <UButton @click="isOpen = true" icon="i-heroicons-plus" />
    </UTooltip>

    <UModal v-model="isOpen">
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UCard
          :ui="{
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          }"
        >
          <template #header> New Comment </template>

          <UFormGroup label="Comment" name="comment">
            <UTextarea v-model="state.comment" />
          </UFormGroup>

          <template #footer>
            <UButton type="submit" :loading="isSubmitting">
              Add Comment
            </UButton>
          </template>
        </UCard>
      </UForm>
    </UModal>
  </div>
</template>
