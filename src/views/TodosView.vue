<template>
    <h1
      class="text-center text-4xl relative z-10 mb-5 text-white text-shadow-3d"
    >
      Joe's Vue Todos
    </h1>
    <div class="font-sans mx-auto p-5 bg-teal-800 rounded max-w-md">
      <AddTask @addTask="add" />
      <TaskList
        :tasks="tasks"
        @remove-task="remove"
        @update-task="update"
      />
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/setUser'
import { ref, onMounted } from "vue";
import AddTask from "../components/AddTask.vue";
import TaskList from "../components/TaskList.vue";
import { addTask, fetchLists, removeTask, updateTask } from "../api/axiosApi";

const currentUser = useUserStore();

// Fields
const tasks = ref([]);

onMounted(() => {
  console.log(currentUser.username)
  fetchItems()
})
const fetchItems = async () => {
  const response = await fetchLists()
  if (response) {
    tasks.value = response;
  }
}

// }
const add = async (task) => {
  const newTask = {
    PK: `USERID#${task.PK}`,
    SK: `LISTID#${task.SK}#ITEMID#${task.ItemId}`,
    ItemId: JSON.stringify(task.ItemId),
    ItemName: task.ItemName,
    Completed: task.Completed,
  }
  const response = await addTask(newTask);
  if (response) {
    tasks.value.push(newTask);
  }
};

const remove = async (task) => {
  const id = task.ItemId;
  console.log(tasks.value)
  const response = await removeTask(task);
  if (response) {
    tasks.value = tasks.value.filter((t) => t.ItemId !== id);
  }
};

const update = (task) => {
  console.log(task)
  updateTask(task);
};
</script>