<template>
  <div class="flex justify-between mb-5">
    <input
      class="flex-grow p-2 text-emerald-700 font-semibold border border-white rounded"
      type="text"
      v-model="newTaskInput"
      @keydown.enter="addTask"
      placeholder="Add a new Task"
    />
    <button
      @click="addTask"
      class="ml-2 px-5 py-2 bg-emerald-200 text-white rounded cursor-pointer hover:bg-white hover:text-emerald-200 hover:border-emerald-200 border border-emerald-200"
    >
      <span class="font-rounded font-bold" >Add Task</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["add-task"]);
const newTaskInput = ref("");
const addTask = () => {
  if (newTaskInput.value) {
    const taskId = Math.floor(
      Math.random() * (9999999999 - 100000000) + 100000000
    );
    const task = {
      id: taskId,
      name: newTaskInput.value,
      completed: false,
    };
    emit("add-task", task);
    newTaskInput.value = "";
  }
};
</script>
