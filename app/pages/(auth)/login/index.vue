<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { type Schema, getInitialFormData, loginSchema } from "./_constants";

  definePageMeta({
    layout: "auth",
  });

  const state = ref(getInitialFormData());

  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    await execute({
      path: "/api/auth/login",
      body: event.data,
      async onSuccess() {
        await navigateTo("/dashboard");
      },
      onError(error) {
        useToastError(String(error.statusCode), error.data.message);
      },
    });
  }
</script>

<template>
  <Title>Login</Title>
  <main class="flex w-full items-center justify-center">
    <UCard class="w-full max-w-md">
      <div class="space-y-6">
        <div class="flex flex-col items-center text-center">
          <NuxtLink href="/">
            <NuxtImg
              src="/smile.png"
              width="150"
              height="150"
              alt="logo smile"
            />
          </NuxtLink>
          <div class="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Selamat Datang
          </div>
        </div>
        <UForm
          :schema="loginSchema"
          :state="state"
          class="w-full space-y-6"
          @submit="onSubmit"
        >
          <UFormGroup label="Username" name="username">
            <UInput
              v-model="state.username"
              :leading="true"
              placeholder="Masukkan nama pengguna"
            />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput
              v-model="state.password"
              :leading="true"
              type="password"
              placeholder="Masukkan kata sandi"
            />
          </UFormGroup>

          <UCheckbox v-model="state.rememberMe" label="Ingat saya" />

          <UButton
            class="flex w-full justify-center"
            type="submit"
            :loading="isLoading"
          >
            Masuk
          </UButton>
        </UForm>
      </div>
    </UCard>
  </main>
</template>
