<script lang="ts" setup>
  definePageMeta({
    layout: "main",
  });

  const { width } = useWindowSize();

  const page = ref(1);
  const pageCount = ref(4);
  const items = ref(Array.from({ length: 55 }, (_, i) => i + 1));
  const pagedItems = computed(() => {
    return items.value?.slice(
      (page.value - 1) * pageCount.value,
      page.value * pageCount.value
    );
  });

  watchEffect(() => {
    if (width.value >= 1024) {
      pageCount.value = 4;
    } else if (width.value >= 768) {
      pageCount.value = 2;
    } else {
      pageCount.value = 1;
    }
  });
</script>

<template>
  <main class="container flex flex-col items-center gap-4 py-12">
    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="(item, index) in pagedItems"
        :key="index"
        class="flex flex-col rounded-md border-t-4 border-blue-700 shadow-lg"
      >
        <div class="h-72 w-full bg-gray-400" />
        <div class="px-8 py-4">
          <h1 class="text-3xl font-bold text-blue-900">Title {{ item }}</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum unde
            porro, impedit blanditiis consectetur suscipit sint sunt ut
            exercitationem vitae cupiditate illo nobis delectus, excepturi
            dicta. Odio minus omnis cumque.
          </p>
        </div>
        <UButton class="mx-auto my-4 w-fit" variant="outline" :to="`/${item}`">
          Selengkapnya
        </UButton>
      </div>
    </div>
    <UPagination v-model="page" :page-count="pageCount" :total="items.length" />
  </main>
</template>
