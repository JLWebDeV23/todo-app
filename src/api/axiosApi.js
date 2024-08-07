import axios from "axios";

const apiClient = axios.create({
  baseURL:
    "https://3n3otta4p3.execute-api.ap-southeast-2.amazonaws.com/default/",
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": "Xn98TnxayS4eZHcN3CRBA5JIWcl1DoJk29Z6Qeqf",
  },
});

export const fetchLists = async (user) => {
  try {
    const response = await apiClient.get("getTaskList", {
      params: {
        user_id: `${user.username}`,
        list_id_item_id: `LISTID#${user.list_id}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const addTask = async (task) => {
  try {
    const response = await apiClient.put(`AddTodoFunction`, {
      PK: task.PK,
      SK: task.SK,
      ItemId: JSON.stringify(task.ItemId),
      ItemName: task.ItemName,
      Completed: task.Completed,
    });
    console.log("Task added:", response.data.message);
    return response.data.message; // Return the actual message from the response
  } catch (error) {
    console.error("Error adding task:", error);
    throw error; // Rethrow the error to be handled or logged by the caller
  }
};

export const removeTask = async (task) => {
  try {
    console.log(task);
    const response = await apiClient.delete(`removeTask`, {
      data: {
        PK: task.PK,
        SK: task.SK,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error removing task:", error);
    throw error; // Rethrow the error for further handling
  }
};

export const updateTask = async (task) => {
  try {
    const response = await apiClient.post(`updateTask`, {
      PK: task.PK,
      SK: task.SK,
      completed: task.Completed,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const userRegistration = async (user) => {
  try {
    const response = await apiClient.put(
      `userRegistration`,
      {
        username: `USERID#${user.username}`,
        password: user.password,
        email: user.email,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error registering the user:", error);
    throw error;
  }
};

export const userLogin = async (user) => {
  try {
    const response = await apiClient.post(
      `userLogin`,
      {
        username: `USERID#${user.username}`,
        password: `${user.password}`,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
