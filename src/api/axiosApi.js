import axios from "axios";
const API_BASE_URL =
  "https://3n3otta4p3.execute-api.ap-southeast-2.amazonaws.com/default";

export const fetchLists = async (task) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getTaskList`, {
      params: {
        pk: task.userId,
        sk: task.listId,
        itemId: task.itemId,
        itemName: task.itemName,
        completed: task.completed,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const addTask = async (task) => {
  axios
    .put(`${API_BASE_URL}/AddTodoFunction`, {
      params: {
        pk: task.userId,
        sk: task.listId,
        itemId: task.itemId,
        itemName: task.itemName,
        completed: task.completed,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding task:", error);
      throw error;
    });
};

export const removeTask = async (task) => {
  axios
    .delete(`${API_BASE_URL}/removeTask`, {
      params: {
        userId: task.userId,
        listId: task.listId,
        itemId: task.itemName,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("Error removing task:", error);
      throw error;
    });
};

export const updateTask = async (task) => {
  const newTask = {
    userId: task.userId,
    listId: task.listId,
    itemId: task.itemId,
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
