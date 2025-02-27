<script lang="ts" setup>
  definePageMeta({
    layout: "main",
  });

  const route = useRoute();
</script>

<template>
  <div class="h-72 w-full bg-gray-400" />
  <main class="container flex flex-col items-center gap-4 py-12">
    <h1 class="text-center text-6xl font-bold">Title {{ route.params.id }}</h1>
    <div>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam
        cumque, accusamus porro velit vel totam sapiente pariatur, saepe,
        expedita ex similique aut. Non eveniet consequatur molestias dolorum
        aliquam quod illum.
      </p>
    </div>
  </main>
</template>
