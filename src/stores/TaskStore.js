import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    isLoading: false,
  }),
  getters: {
    favs() {
      return this.tasks.filter((task) => task.isFav);
    },
    favCount() {
      return this.tasks.reduce((previous, current) => {
        return current.isFav ? previous + 1 : previous;
      }, 0);
    },
    totalCount: (state) => {
      return state.tasks.length;
    },
  },
  actions: {
    async getTasks() {
      this.isLoading = true;
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();

      this.tasks = data;
      this.isLoading = false;
    },
    async addTask(task) {
      this.tasks.push(task);
      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });

      if (res.error) {
        console.log(res.error);
      }
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter((task) => {
        return task.id !== id;
      });
      const res = await fetch("http://localhost:3000/tasks/" + id, {
        method: "DELETE",
      });

      if (res.error) {
        console.log(res.error);
      }
    },
    async toggleFav(id) {
      const task = this.tasks.find((t) => t.id === id);
      task.isFav = !task.isFav;

      const res = await res.fetch("http://localhost:3000/tasks/" + id, {
        method: "PATCH",
        body: JSON.stringify({ isFav: task.isFav }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.error) {
        console.log(res.error);
      }
    },
    async toggleCompleted(id) {
      const task = this.tasks.find((t) => t.id === id);
      task.completed = !task.completed;

      const res = await fetch("http://localhost:3000/tasks/" + id, {
        method: "PATCH",
        body: JSON.stringify({ completed: task.completed }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.error) {
        console.log(res.error);
      }
    },
  },
  persist: true,
});
