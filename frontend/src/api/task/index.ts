import instance from "..";

export const taskList = (page: number, pageSize: number, searchKey: string) =>
  instance.get<string, API.CommonResp>(
    `api/tasks?searchKey=${searchKey}&page=${page}&pageSize=${pageSize}`
  );

export const createTask = (formData: API.TaskItem) =>
  instance.post<string, API.CommonResp>("api/tasks", formData);

export const getTask = (id?: string) =>
  instance.get<string, API.CommonResp>("api/tasks/" + id);

export const updateTask = (id: string, formData: API.TaskItem) =>
  instance.put<string, API.CommonResp>("api/tasks/" + id, formData);

export const deleteTask = (id?: string) =>
  instance.delete<string, API.CommonResp>("api/tasks/" + id);
