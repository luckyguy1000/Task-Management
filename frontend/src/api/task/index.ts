import instance from "..";

export const taskList = () => instance.get<string, API.CommonResp>("api/tasks");

export const createTask = (formData: API.TaskItem) =>
  instance.post<string, API.CommonResp>("api/tasks", formData);

export const getTask = (id?: string) =>
  instance.get<string, API.CommonResp>("api/tasks/" + id);

export const updateTask = (id: string, formData: API.TaskItem) =>
  instance.put<string, API.CommonResp>("api/tasks/" + id, formData);

export const deleteTask = (id?: string) =>
  instance.delete<string, API.CommonResp>("api/tasks/" + id);
