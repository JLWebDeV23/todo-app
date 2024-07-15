<template>
  <div class="flex justify-between items-center gap-4 w-full">
    <input type="checkbox" @click="updateTask(task)" :checked=task.Completed class="w-8" />
    <span :class="{ 'line-through': task.Completed === true, 'flex-grow': true }" class="text-white  font-bold font-serif" >{{
      task.ItemName
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
  console.log(task.Completed)
  task.Completed = !task.Completed;
  emit("update-task",  task);
};
</script>
