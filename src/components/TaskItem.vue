<template>
  <div class="flex justify-between items-center gap-4 w-full">
    <input type="checkbox" @click="updateTask(task)" class="w-8" />
    <span :class="{ 'line-through': task.completed, 'flex-grow': true }" class="text-white  font-bold font-serif" >{{
      task.name
    }}</span>
    <button class="w-8 text-red-400 font-bold hover:text-white" @click="removeTask(task)">
      x
    </button>
  </div>
</template>

<script setup>
defineProps({
  task: Object,
});

const emit = defineEmits(["remove-task", "update-task"]);
const removeTask = (task) => {
  emit("remove-task", task);
};

const updateTask = (task) => {
  task.completed = !task.completed;
  emit("update-task",  task);
};
</script>
