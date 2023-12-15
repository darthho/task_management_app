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
          All Tasks
        </button>
        <button
          class="bg-[#ffa535] rounded-lg ml-3 cursor-pointer px-3 py-2"
          @click="filter = 'favs'"
        >
          Fav Tasks
        </button>
      </nav>

      <!-- loading -->
      <div
        class="bg-[#ffe9a0] lg:mx-40 rounded text-center my-10 py-2"
        v-if="taskStore.isLoading"
      >
        loading tasks...
      </div>

      <!-- task list -->
      <div class="lg:mx-40" v-if="filter === 'all'">
        <p>You have {{ taskStore.totalCount }} tasks</p>
        <div v-for="task in taskStore.tasks" :key="task.id">
          <TaskDetails :task="task" />
        </div>
      </div>

      <div class="lg:mx-40" v-if="filter === 'favs'">
        <p>You have {{ taskStore.favCount }} favs</p>
        <div v-for="task in taskStore.favs">
          <TaskDetails :task="task" />
        </div>
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
import { ref } from "vue";
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

// Fetch tasks
taskStore.getTasks();
</script>
