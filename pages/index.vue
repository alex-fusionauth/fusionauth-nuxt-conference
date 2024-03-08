

<template>
    <UContainer>
      <UCard class="mt-10">
        <template #header>
          <div class="flex justify-between">
            <h1>Welcome to FusionFun</h1>
            <ColorScheme
              ><USelect
                v-model="$colorMode.preference"
                :options="['system', 'light', 'dark']"
            /></ColorScheme>
            <AuthSignInButton />
          </div>
        </template>
      </UCard>
    </UContainer>
  </template>