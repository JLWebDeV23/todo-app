<template>
  <div class="flex-col">
    <h1
      class="text-center text-4xl relative z-10 mb-5 text-white text-shadow-3d"
    >
      Joe's Vue Todos
    </h1>
    <div class="font-sans mx-auto p-5 bg-teal-800 rounded max-w-md">
      <AddTask @addTask="addTask" />
      <TaskList
        :tasks="tasks"
        @remove-task="removeTask"
        @update-task="updateTask"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AddTask from "./components/AddTask.vue";
import TaskList from "./components/TaskList.vue";

// Fields
const tasks = ref([]);

// onMounted(() => {
//   // call api

// }
const addTask = (task) => {
  // call api
  tasks.value.push(task);
  console.log("Add Task");
};

const removeTask = (task) => {
  // call api
  // tasks.value.pop()
  tasks.value = tasks.value.filter((t) => t.id !== task.id);

  console.log("Remove Task");
};

const updateTask = (task) => {
  // call api
  console.log("Update Task");
};
</script>
