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
      try {
        this.isLoading = true;
        const res = await fetch("http://localhost:3000/tasks");

        if (!res.ok) {
          localStorage.setItem("tasks", JSON.stringify(data));
          const localTasks = localStorage.getItem("tasks");
          if (localTasks) {
            this.tasks = JSON.parse(localTasks);
          }
          throw new Error("Failed to fetch tasks");
        }

        const data = await res.json();
        this.tasks = data;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async addTask(task) {
      try {
        this.tasks.push(task);
        const res = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          body: JSON.stringify(task),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          localStorage.setItem("tasks", JSON.stringify(this.tasks));
          throw new Error("Failed to add task");
        }

        const data = await res.json();
        // Assuming the server responds with updated task data including an ID
        this.tasks.push(data);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },

    async deleteTask(id) {
      try {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        const res = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          localStorage.setItem("tasks", JSON.stringify(this.tasks));
          throw new Error("Failed to delete task");
        }
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },

    async toggleFav(id) {
      try {
        const task = this.tasks.find((t) => t.id === id);
        task.isFav = !task.isFav;

        const res = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ isFav: task.isFav }),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          localStorage.setItem("tasks", JSON.stringify(this.tasks));
          throw new Error("Failed to toggle favorite");
        }
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    },

    async toggleCompleted(id) {
      try {
        const task = this.tasks.find((t) => t.id === id);
        task.completed = !task.completed;

        const res = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ completed: task.completed }),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          localStorage.setItem("tasks", JSON.stringify(this.tasks));
          throw new Error("Failed to toggle completion");
        }
      } catch (error) {
        console.error("Error toggling completion:", error);
      }
    },
  },
  persist: true,
});
