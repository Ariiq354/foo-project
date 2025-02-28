<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { getInitialFormData, schema, type Schema } from "./_constants";

  onMounted(() => {
    defineTopbarTitle("Daftar Blog");
  });

  const state = ref(getInitialFormData());
  const { data, refresh } = await useLazyFetch("/api/blog");

  const modalOpen = ref(false);
  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    await execute({
      path: "/api/blog",
      body: event.data,
      onSuccess() {
        modalOpen.value = false;
        refresh();
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
      <UFormGroup label="Description" name="description">
        <UInput v-model="state.description" :disabled="isLoading" />
      </UFormGroup>
      <UFormGroup label="Image" name="img">
        <ImageUpload
          upload-preset="hqtlc7qt"
          :url="state.img ? state.img : ''"
          @change="(url) => (state.img = url)"
          @remove="() => (state.img = '')"
        />
      </UFormGroup>
      <UFormGroup label="Content" name="data">
        <TipTapEditor v-model="state.data" />
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
          Simpan
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
    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="flex flex-col rounded-md border-t-4 border-blue-700 shadow-lg"
      >
        <div class="flex h-72 w-full items-center overflow-hidden">
          <NuxtImg :src="item.img" />
        </div>
        <div class="px-8 py-4">
          <h1 class="text-3xl font-bold text-blue-900">{{ item.title }}</h1>
          <p>
            {{ item.description }}
          </p>
        </div>
        <UButton
          class="mx-auto my-4 w-fit"
          variant="outline"
          :to="`/${item.id}`"
        >
          Selengkapnya
        </UButton>
      </div>
    </div>
  </main>
</template>
