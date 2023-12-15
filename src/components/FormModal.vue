<template>
  <div
    v-if="showModalPopup"
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

        <div class="relative flex flex-col">
          <label class="mb-2 font-medium text-lg">Priority</label>
          <div class="relative inline-block">
            <input
              type="text"
              v-model="priority"
              @click="isOpen = !isOpen"
              readonly
              class="border border-[#ffa535] rounded-lg px-3 py-3 cursor-pointer w-full"
            />
            <div class="absolute right-3 -mt-7">
              <svg
                class="fill-current w-4 h-4"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 12l-5-5 1.5-1.5L10 9.002l3.5-3.5L15 7z"
                  fill="currentColor"
                  class="transform transition-transform"
                  :class="{ 'rotate-180': isOpen }"
                ></path>
              </svg>
            </div>

            <div
              v-show="isOpen"
              class="absolute top-10 z-10 bg-white border border-[#ffa535] rounded-lg py-1 px-3 mt-1 shadow-md w-full"
            >
              <div class="py-1">
                <input
                  type="text"
                  @click="selectPriority('High')"
                  class="hover:bg-[#ffa535] cursor-pointer px-2 py-1 w-full border-none outline-none"
                  value="High"
                  readonly
                />
                <input
                  type="text"
                  @click="selectPriority('Mid')"
                  class="hover:bg-[#ffa535] cursor-pointer px-2 py-1 w-full border-none outline-none"
                  value="Mid"
                  readonly
                />
                <input
                  type="text"
                  @click="selectPriority('Low')"
                  class="hover:bg-[#ffa535] cursor-pointer px-2 py-1 w-full border-none outline-none"
                  value="Low"
                  readonly
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          class="bg-[#ffa535] rounded-lg cursor-pointer font-bold w-full py-3"
        >
          Add
        </button>
      </form>
    </div>
    <feedback v-if="showFeedback"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/TaskStore";
import Feedback from "./Feedback.vue";
import { defineEmits } from "vue";
const emits = defineEmits("close");

const showModalPopup = ref(true);
const taskStore = useTaskStore();
const isOpen = ref(false);
const newTask = ref("");
const date = ref("");
const priority = ref("");

const formatDate = (inputDate) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const date = new Date(inputDate);
  return date.toLocaleDateString("en-US", options);
};

const handleSubmit = () => {
  if (newTask.value.length > 0 && date.value.length > 0) {
    const formattedDate = formatDate(date.value);
    taskStore.addTask({
      title: newTask.value,
      date: formattedDate,
      isFav: false,
      priority: priority.value,
      id: Math.floor(Math.random() * 10000),
    });
    console.log(4, showModalPopup.value);
    emits("close");
    console.log(5, showModalPopup.value);
  }
};

const selectPriority = (selectedPriority) => {
  priority.value = selectedPriority;
  isOpen.value = false;
};
</script>
