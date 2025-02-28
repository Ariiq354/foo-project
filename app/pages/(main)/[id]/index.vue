<script lang="ts" setup>
  import DOMPurify from "dompurify";
  import type { FormSubmitEvent } from "#ui/types";
  import { getInitialFormData, schema, type Schema } from "./_constants";

  definePageMeta({
    layout: "main",
  });
  const route = useRoute();

  const { data } = await useLazyFetch(`/api/blog/${route.params.id}`);

  const sanitizedHtml = computed(() =>
    import.meta.client && data.value
      ? DOMPurify.sanitize(data.value.data || "")
      : data.value?.data || ""
  );

  const state = ref(getInitialFormData());

  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    await execute({
      path: "/api/komen",
      body: event.data,
      onSuccess() {
        useToastSuccess("Berhasil", "Pesan berhasil dikirim");
      },
      onError(error) {
        useToastError(String(error.statusCode), error.data.message);
      },
    });
  }
</script>

<template>
  <div class="flex h-72 w-full items-center overflow-hidden bg-gray-400">
    <NuxtImg v-if="data" :src="data?.img" class="w-full opacity-20" />
  </div>
  <main class="container py-12">
    <h1 v-if="data" class="text-center text-6xl font-bold">
      {{ data?.title }}
    </h1>
    <!-- eslint-disable vue/no-v-html -->
    <div
      class="tiptap prose prose-base w-full max-w-none"
      v-html="sanitizedHtml"
    />
  </main>
  <!-- prettier-ignore -->
  <hr>
  <div class="container my-12">
    <h1 class="text-center text-2xl">Kirim Pesan</h1>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Nama" name="name">
        <UInput v-model="state.name" :disabled="isLoading" />
      </UFormGroup>
      <UFormGroup label="No Telepon" name="noTelepon">
        <UInput v-model="state.noTelepon" :disabled="isLoading" />
      </UFormGroup>
      <UFormGroup label="Pesan" name="pesan">
        <UTextarea v-model="state.pesan" :disabled="isLoading" />
      </UFormGroup>
      <UButton type="submit" :loading="isLoading"> Kirim </UButton>
    </UForm>
  </div>
</template>
