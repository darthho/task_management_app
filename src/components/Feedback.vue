<template>
  <div
    v-if="visible"
    :class="[
      'fixed',
      'top-20',
      'right-20',
      'p-2',
      'rounded',
      'text-white',
      'z-50',
      'max-w-[300px]',
      'opacity-100',
      'transition-opacity',
      notificationTypeClasses,
    ]"
  >
    <div class="flex justify-between bg-green-500 px-4 rounded py-2">
      <div>{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    notificationType: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.closeNotification();
    }, 5000);
  },
  methods: {
    closeNotification() {
      this.visible = false;
      this.$emit("closed");
    },
  },
  computed: {
    notificationTypeClasses() {
      return {
        "bg-red-500": this.notificationType === "error",
        "bg-blue-500": this.notificationType === "info",
      };
    },
  },
};
</script>
