<template>
  <div
    class="p-3 bg-white mt-4 rounded-md shadow-md flex justify-between items-center w-full"
  >
    <h3 class="inline-block">{{ task.title }}</h3>
    <div class="icons text-right">
      <i
        class="material-icons text-base ml-2 cursor-pointer text-gray-400 hover:text-red-600"
        @click="taskStore.deleteTask(task.id)"
        >delete</i
      >
      <i
        class="material-icons text-base ml-2 cursor-pointer  hover:text-pink-500"
        :class="{ 'text-pink-500': task.isFav }"
        @click="taskStore.toggleFav(task.id)"
        >favorites</i
      >
    </div>
  </div>
</template>

<script>
import { useTaskStore } from "../stores/TaskStore";
export default {
  props: ["task"],
  setup() {
    const taskStore = useTaskStore();
    return { taskStore };
  },
};
</script>
