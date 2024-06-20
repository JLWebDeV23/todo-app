<template>
  <ul class="w-full" v-if="tasks.length > 0">
    <li
      v-for="task in tasks"
      :key="task.id"
      class="flex justify-between items-center text-black p-4 border-b border-gray-200"
    >
      <TaskItem
        :task="task"
        @remove-task="() => removeTask(task)"
        @update-task="updateTask"
      />
    </li>
  </ul>
</template>

<script setup>
import TaskItem from "./TaskItem.vue";

const emit = defineEmits(["remove-task", "update-task"]);
defineProps({
  tasks: Array,
});

const removeTask = (task) => {
  emit("remove-task", task);
};

const updateTask = (task) => {
  emit("update-task", task);
};


</script>
