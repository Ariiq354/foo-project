<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { getInitialFormData, schema, type Schema } from "./_constants";

  onMounted(() => {
    defineTopbarTitle("Daftar Blog");
  });

  const state = ref(getInitialFormData());
  // const { data, status, refresh } = await useLazyFetch(
  //   "/api/penjualan-athar/pembayaran"
  // );

  const modalOpen = ref(false);
  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    await execute({
      path: "/api/penjualan-athar/pembayaran",
      body: event.data,
      onSuccess() {
        modalOpen.value = false;
      },
      onError(error) {
        useToastError(String(error.statusCode), error.data.message);
      },
    });
  }

  function clickAdd() {
    modalOpen.value = true;
  }
</script>

<template>
  <Title>Daftar Blog</Title>
  <LazyAppModal
    v-model="modalOpen"
    title="Tambah Pembayaran"
    :pending="isLoading"
  >
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Title" name="title">
        <UInput v-model="state.title" :disabled="isLoading" />
      </UFormGroup>
      <UFormGroup label="Img" name="img">
        <UInput v-model="state.img" :disabled="isLoading" />
      </UFormGroup>
      <UFormGroup label="Data" name="data">
        <!-- <TipTapEditor /> -->
      </UFormGroup>

      <div class="flex w-full justify-end gap-2">
        <UButton
          icon="i-heroicons-x-mark-16-solid"
          variant="ghost"
          :disabled="isLoading"
          @click="modalOpen = false"
        >
          Batal
        </UButton>
        <UButton
          type="submit"
          icon="i-heroicons-check-16-solid"
          :loading="isLoading"
        >
          Bayar
        </UButton>
      </div>
    </UForm>
  </LazyAppModal>
  <main>
    <div
      class="mb-6 flex items-center justify-between gap-2 rounded-lg border border-gray-200 p-3 dark:border-gray-700"
    >
      <div class="flex gap-2">
        <UButton
          icon="i-heroicons-plus"
          :disabled="isLoading"
          variant="soft"
          class="gap-2 text-xs text-black md:text-base dark:text-white"
          @click="clickAdd"
        >
          Tambah
        </UButton>
        <UButton
          icon="i-heroicons-trash"
          variant="soft"
          class="gap-2 text-xs text-black disabled:opacity-50 md:text-base dark:text-white"
        >
          Hapus
        </UButton>
      </div>
    </div>
    <TipTapEditor v-model="state.data" />
  </main>
</template>
