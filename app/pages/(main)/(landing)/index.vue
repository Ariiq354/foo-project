<script lang="ts" setup>
  definePageMeta({
    layout: "main",
  });

  const { width } = useWindowSize();

  const page = ref(1);
  const pageCount = ref(4);
  const offset = computed(() => pageCount.value * (page.value - 1));

  watchEffect(() => {
    if (width.value >= 1024) {
      pageCount.value = 4;
    } else if (width.value >= 768) {
      pageCount.value = 2;
    } else {
      pageCount.value = 1;
    }
  });

  const { data } = await useLazyFetch("/api/blog", {
    query: {
      limit: pageCount,
      offset,
    },
  });
</script>

<template>
  <main
    v-if="data?.length"
    class="container flex flex-col items-center gap-4 py-12"
  >
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
    <UPagination v-model="page" :page-count="pageCount" :total="data!.length" />
  </main>
  <main v-else>No Data</main>
</template>
