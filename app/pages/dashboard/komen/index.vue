<script setup lang="ts">
  import { columns } from "./_constants";

  onMounted(() => {
    defineTopbarTitle("Daftar Komen");
  });

  const limit = ref(5);
  const offset = ref(0);
  const { data, status } = await useFetch("/api/komen", {
    query: {
      limit,
      offset,
    },
  });

  function pageChangeHandler(page: number) {
    offset.value = limit.value * (page - 1);
  }
</script>

<template>
  <main>
    <Title>Daftar Komen</Title>
    <UCard>
      <AppTable
        :columns="columns"
        :data="data"
        :loading="status === 'pending'"
        @page-change="(i) => pageChangeHandler(i)"
      >
        <template #pesan-data="{ row }">
          <div class="text-wrap">{{ row.pesan }}</div>
        </template>
      </AppTable>
    </UCard>
  </main>
</template>
