<script setup lang="ts">
const { signIn, signOut, data, status, getSession, getCsrfToken } = await useAuth()
const clickSignIn = async () => {
    await signIn(undefined)
}
const clickSignOut = async () => {
    await signOut(undefined)
}

const items = [
  [{
    label: data.value?.user?.email,
    slot: 'account',
    disabled: true
  }], [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: clickSignOut
  }]
]
</script>

<template>
    <UButton v-if="status === 'unauthenticated'" @click="clickSignIn()">SignIn</UButton>

    <UDropdown v-else :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-end' }">
        <UAvatar  icon="i-heroicons-user-circle" size="lg" />

        <template #account="{ item }">
            <div class="text-left">
                <p>
                Signed in as
                </p>
                <p class="truncate font-medium text-gray-900 dark:text-white">
                {{ item.label }}
                </p>
            </div>
        </template>
    </UDropdown>
</template>