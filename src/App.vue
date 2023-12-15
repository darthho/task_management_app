<template>
  <div class="bg-[#2B1D3D] h-screen overflow-auto text-[#444]">
    <main class="p-6 md:py-8 md:px-8 lg:px-14 flex flex-col">
      <!-- heading -->
      <header
        class="text-center bg-white rounded-2xl flex content-center items-center justify-center p-6"
      >
        <img
          src="./assets/image.png"
          alt=""
          class="w-24 transform rotate-[-10deg]"
        />

        <h1
          class="m-0 text-2xl pt-25 pl-15 text-gray-700 transform rotate-[2deg]"
        >
          Tasks.by.Fae
        </h1>
      </header>

      <!-- filter -->
      <nav class="my-4 self-end">
        <button
          class="bg-[#ffa535] rounded-lg cursor-pointer px-4 font-black py-2"
          @click="showModal"
        >
          +
        </button>
        <button
          class="bg-[#ffa535] rounded-lg ml-3 cursor-pointer px-3 py-2"
          @click="filter = 'all'"
        >
          📜 Tasks
        </button>
        <button
          class="bg-[#ffa535] rounded-lg ml-3 cursor-pointer px-3 py-2"
          @click="filter = 'favs'"
        >
          💓ed Tasks
        </button>
      </nav>

      <!-- loading -->
      <div
        class="bg-[#ffe9a0] lg:mx-40 rounded text-center my-10 py-2"
        v-if="taskStore.isLoading"
      >
        loading tasks...
      </div>
      <div
        v-else
        class="flex w-full space-x-3 self-center items-center justify-center"
      >
        <div class="flex space-x-2 items-center">
          <div class="h-4 w-4 rounded-full bg-red-600"></div>
          <p>High Priority</p>
        </div>
        <div class="flex space-x-2 items-center">
          <div class="h-4 w-4 rounded-full bg-orange-600"></div>
          <p>Mid Priority</p>
        </div>
        <div class="flex space-x-2 items-center">
          <div class="h-4 w-4 rounded-full bg-green-600"></div>
          <p>Low Priority</p>
        </div>
      </div>

      <!-- task list -->
      <div class="lg:mx-40">
        <template v-if="filter === 'all'">
          <p>You have {{ sortedTasks.length }} tasks</p>
          <div v-for="task in sortedTasks" :key="task.id">
            <TaskDetails :task="task" />
          </div>
        </template>

        <template v-if="filter === 'favs'">
          <p>You have {{ sortedTasks.length }} favs</p>
          <div v-for="task in sortedTasks" :key="task.id">
            <TaskDetails :task="task" />
          </div>
        </template>
      </div>

      <button @click="taskStore.$reset" class="my-2">clear all</button>
    </main>
    <!-- <footer class="bg-white">
      <hr />
      <div class="flex justify-between px-6 md:px-8 lg:px-14 py-2">
        <div>
          Image by
          <a
            href="https://www.freepik.com/free-psd/3d-rendering-graphic-design-element_26433067.htm#query=task&position=0&from_view=search&track=sph&uuid=b5064c88-485e-44c6-b5bb-e41effdf2911"
            >Freepik</a
          >
        </div>
        <div>Project by Favour Enwonwu</div>
      </div>
    </footer> -->
    <form-modal v-if="showFormModal" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TaskDetails from "./components/TaskDetails.vue";
import { useTaskStore } from "./stores/TaskStore";
import FormModal from "./components/FormModal.vue";

// Variables
const showFormModal = ref(false);
const taskStore = useTaskStore();
const filter = ref("all");

const closeModal = () => {
  console.log(3, showFormModal.value);
  showFormModal.value = false;
};

const showModal = () => {
  console.log(1, showFormModal.value);
  showFormModal.value = true;
  console.log(2, showFormModal.value);
};

const sortedTasks = computed(() => {
  if (filter.value === "all") {
    return taskStore.tasks.slice().sort((a, b) => {
      const priorityOrder = { High: 1, Mid: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  } else if (filter.value === "favs") {
    return taskStore.favs.slice().sort((a, b) => {
      const priorityOrder = { High: 1, Mid: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }
  return [];
});

// Fetch tasks
taskStore.getTasks();
</script>
