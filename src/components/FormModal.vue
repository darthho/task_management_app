<template>
  <div
    v-if="showModal"
    class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
  >
    <!-- Modal content -->
    <div
      class="bg-white p-6 flex flex-col shadow-md rounded-2xl w-[300px] md:w-[500px] lg:w-[400px]"
    >
      <p
        class="h-6 w-6 bg-[#ffa535] flex justify-center text-center rounded-full self-end cursor-pointer"
        @click="$emit('close')"
      >
        x
      </p>
      <h1 class="self-center my-4 text-2xl font-semibold">Add Task</h1>
      <form @submit.prevent="handleSubmit" class="space-y-3">
        <div>
          <label class="mb-2 font-medium text-lg">Task</label>
          <input
            type="text"
            placeholder="study?  shop??"
            v-model="newTask"
            class="border border-[#ffa535] rounded-lg outline-none text-[#555] text-sm p-3 w-full"
          />
        </div>
        <div>
          <label class="mb-2 font-medium text-lg">Due Date</label>
          <input
            type="date"
            placeholder="study?  shop??"
            v-model="date"
            class="border border-[#ffa535] rounded-lg outline-none text-[#555] text-sm p-3 w-full"
          />
        </div>

        <button
          class="bg-[#ffa535] rounded-lg cursor-pointer font-bold w-full py-3"
        >
          Add
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useTaskStore } from "../stores/TaskStore";

export default {
  setup() {
    const showModal = ref(true);
    const taskStore = useTaskStore();
    const newTask = ref("");
    const date = ref("");
    const formatDate = (inputDate) => {
      const options = { day: "numeric", month: "long", year: "numeric" };
      const date = new Date(inputDate);
      return date.toLocaleDateString("en-US", options);
    };

    // Inside your setup function
    const handleSubmit = () => {
      if (newTask.value.length > 0 && date.value.length > 0) {
        const formattedDate = formatDate(date.value);
        taskStore.addTask({
          title: newTask.value,
          date: formattedDate,
          isFav: false,
          id: Math.floor(Math.random() * 10000),
        });
        newTask.value = "";
        date.value = ""; 
        showModal.value = false;
      }
    //   console.log(newTask, date);
    };

    // Return formattedDate alongside other variables
    return { showModal, handleSubmit, newTask, date, formatDate };
  },
};
</script>
