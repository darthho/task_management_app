<template>
  <div
    class="p-3 bg-white mt-4 rounded-md shadow-md flex justify-between items-center w-full"
  >
    <div class="flex items-center">
      <div
        class="w-5 h-5 mr-3 border border-gray-400 rounded-sm flex items-center justify-center cursor-pointer transition-colors duration-300 hover:border-blue-500"
        :class="{ 'bg-[#ffa535]': task.completed }"
        @click="toggleCompleted(task.id)"
      >
        <i v-if="task.completed" class="material-icons">check</i>
      </div>
      <div>
        <h3 class="font-semibold capitalize">{{ task.title }}</h3>
        <p class="text-xs text-gray-700">{{ task.date }}</p>
      </div>
    </div>
    <div class="flex items-center icons text-right">
      <div
        class="h-4 w-4 rounded-full"
        :class="{
          'bg-red-600': task.priority === 'High',
          'bg-orange-600': task.priority === 'Mid',
          'bg-green-600': task.priority === 'Low',
        }"
      >
        <!-- Content -->
      </div>
      <i
        class="material-icons text-base ml-2 cursor-pointer text-gray-400 hover:text-red-600"
        @click="taskStore.deleteTask(task.id)"
        >delete</i
      >
      <i
        class="material-icons text-base ml-2 cursor-pointer hover:text-pink-500"
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
    const toggleCompleted = (taskId) => {
      // Implement logic to toggle task completion in taskStore based on taskId
      taskStore.toggleCompleted(taskId);
    };
    return { taskStore, toggleCompleted };
  },
};
</script>
