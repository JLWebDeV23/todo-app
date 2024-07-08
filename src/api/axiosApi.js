import axios from "axios";

const API_BASE_URL =
  "https://3ivr1uqx80.execute-api.ap-southeast-2.amazonaws.com/dev";

export const fetchLists = async (userId, listId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items`, {
      params: {
        userId,
        listId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const addTask = async (task) => {
  const newTask = {
    userId: task.userId,
    listId: task.listId,
    itemId: task.id,
    itemName: task.name,
    completed: task.completed,
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/tasks`, newTask);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const removeTask = async (task) => {
  const newTask = {
    userId: task.userId,
    listId: task.listId,
    itemId: task.id,
  };
  try {
    const response = await axios.post(`${API_BASE_URL}/removeTask`, newTask);
    return response.data;
  } catch (error) {
    console.error("Error removing task:", error);
    throw error;
  }
};

export const updateTask = async (task) => {
  const newTask = {
    userId: task.userId,
    listId: task.listId,
    itemId: task.id,
    completed: task.completed,
  };
  try {
    const response = await axios.post(`${API_BASE_URL}/updateTask`, {
      newTask,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// addTask({
//   userId: "joey",
//   listId: "supPal",
//   id: "123",
//   name: "TomisCool",
//   completed: false,
// });
const test = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
  console.log(response.data);
};
test();
