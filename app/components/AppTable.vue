<script setup lang="ts">
  defineSlots<{
    [key: string]: (props: any) => any;
  }>();

  type ColumnType = {
    key: string;
    label: string;
    sortable?: boolean;
  };

  type DataItem = { [key: string]: any };

  const {
    data,
    columns,
    label,
    loading,
    pageCount = 10,
  } = defineProps<{
    data: DataItem[] | undefined;
    columns: ColumnType[];
    label?: string;
    loading?: boolean;
    pageCount?: number;
  }>();

  const emit = defineEmits<{
    (event: "pageChange", id: number): void;
  }>();

  const numberedColumn = computed(() => {
    return [
      {
        key: "rownumber",
        label: "No.",
      },
      ...columns,
    ];
  });

  const numberedData = computed((): DataItem[] => {
    if (data) {
      return data.map((item, index) => ({
        rownumber: index + 1,
        ...item,
      }));
    }

    return [];
  });

  const page = ref(1);
</script>

<template>
  <div>
    <div
      class="flex flex-col justify-between gap-2 border-b border-gray-200 py-3 md:flex-row md:items-center md:px-4 dark:border-gray-700"
    >
      <h1>{{ label }}</h1>
    </div>
    <UTable :rows="numberedData" :columns="numberedColumn" :loading="loading">
      <template v-for="(_, name) in $slots" :key="name" #[name]="slotData">
        <slot :name="name" v-bind="slotData ?? {}" />
      </template>
    </UTable>
    <div class="overflow-x-auto">
      <slot name="additional-content" />
    </div>
    <div class="flex justify-end px-3 py-3.5">
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="data ? data.length : 0"
        @update:model-value="emit('pageChange', page)"
      />
    </div>
  </div>
</template>
