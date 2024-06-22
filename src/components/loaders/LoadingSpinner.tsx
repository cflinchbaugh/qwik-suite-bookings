import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="flex items-center justify-center">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
    </div>
  );
});
