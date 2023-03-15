<script setup lang="ts">
const hoverState = 'hover:bg-dark-lighter'
const activeState = 'aria-selected:bg-secondary aria-selected:text-white'
const enterIconVariant = 'hidden group-hover:flex group-aria-selected:flex'
</script>

<template>
  <div
    class="w-full h-14 relative group flex items-center gap-3 cursor-pointer text-sm text-dark bg-white shadow-md select-none px-4 will-change-[background,color] rounded mt-2 first:mt-0"
    :class="[hoverState, activeState]"
    role="option"
  >
    <svg width="20" height="20" viewBox="0 0 20 20">
      <path
        d="M17 6v12c0 .52-.2 1-1 1H4c-.7 0-1-.33-1-1V2c0-.55.42-1 1-1h8l5 5zM14 8h-3.13c-.51 0-.87-.34-.87-.87V4"
        stroke="currentColor"
        fill="none"
        fill-rule="evenodd"
        stroke-linejoin="round"
      ></path>
    </svg>
    <slot />
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      class="absolute top-1/2 right-4 -translate-y-1/2 ml-auto"
      :class="enterIconVariant"
    >
      <g
        stroke="currentColor"
        fill="none"
        fill-rule="evenodd"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 3v4c0 2-2 4-4 4H2"></path>
        <path d="M8 17l-6-6 6-6"></path>
      </g>
    </svg>
  </div>
</template>
