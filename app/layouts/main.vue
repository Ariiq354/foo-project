<template>
  <div class="sticky top-0 z-10 bg-blue-200">
    <NuxtLink
      href="/"
      class="container flex items-center justify-center gap-4 py-4"
    >
      <NuxtImg src="/smile.png" width="50" />
      <h1 class="text-4xl font-bold tracking-widest">CERIA</h1>
    </NuxtLink>
  </div>
  <slot />
</template>
