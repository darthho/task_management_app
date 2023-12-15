<template>
  <form action="" @submit.prevent="handleSubmit" class="flex justify-center space-x-4">
    <input
      type="text"
      placeholder="study?  shop??"
      v-model="newTask"
      class="border border-[#ffa535] rounded-lg outline-none text-[#555] text-sm p-3 w-[70%]"
    />
    <button
      class="bg-[#ffa535] rounded-lg cursor-pointer text-3xl font-bold px-4"
    >
      +
    </button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useTaskStore } from "../stores/TaskStore";
export default {
  setup() {
    const taskStore = useTaskStore();
    const newTask = ref("");
    const handleSubmit = () => {
      if (newTask.value.length > 0) {
        taskStore.addTask({
          title: newTask.value,
          isFav: false,
          id: Math.floor(Math.random() * 10000),
        });
        newTask.value = "";
      }
    };
    return { handleSubmit, newTask };
  },
};
</script>
