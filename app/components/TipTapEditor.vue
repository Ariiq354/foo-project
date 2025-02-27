<script setup lang="ts">
  import { useEditor, EditorContent } from "@tiptap/vue-3";
  import StarterKit from "@tiptap/starter-kit";
  import Underline from "@tiptap/extension-underline";

  const editorData = defineModel<string>();

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class: "border h-48 p-2 overflow-y-auto prose-xl outline-none",
      },
    },
    content: editorData,
    onUpdate: () => {
      editorData.value = editor.value!.getHTML();
    },
  });
</script>

<template>
  <ClientOnly>
    <div class="flex gap-2 border border-b-0 p-4">
      <button
        class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
        :class="{
          'bg-gray-200': editor?.isActive('heading', {
            level: 1,
          }),
        }"
        @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        <UIcon name="i-heroicons-h1" />
      </button>
      <button
        class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
        :class="{
          'bg-gray-200': editor?.isActive('heading', {
            level: 2,
          }),
        }"
        @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        <UIcon name="i-heroicons-h2" />
      </button>
      <button
        class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
        :class="{
          'bg-gray-200': editor?.isActive('heading', {
            level: 3,
          }),
        }"
        @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        <UIcon name="i-heroicons-h3" />
      </button>
      <button
        class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
        :class="{
          'bg-gray-200': editor?.isActive('bold'),
        }"
        @click="editor?.chain().focus().toggleBold().run()"
      >
        <UIcon name="i-heroicons-bold" />
      </button>
      <button
        class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
        :class="{
          'bg-gray-200': editor?.isActive('italic'),
        }"
        @click="editor?.chain().focus().toggleItalic().run()"
      >
        <UIcon name="i-heroicons-italic" />
      </button>
      <button
        class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
        :class="{
          'bg-gray-200': editor?.isActive('underline'),
        }"
        @click="editor?.chain().focus().toggleUnderline().run()"
      >
        <UIcon name="i-heroicons-underline" />
      </button>
    </div>
    <editor-content v-model="editorData" :editor="editor" />
  </ClientOnly>
</template>
