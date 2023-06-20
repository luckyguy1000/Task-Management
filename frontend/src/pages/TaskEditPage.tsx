import * as React from "react";
import { AxiosError } from "axios";
import { notification } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import moment from "moment";

import Block from "../components/common/Block";
import TaskForm, { TaskData } from "../components/task/TaskForm";
import { useAuth } from "../utils/auth";
import { createTask, getTask, updateTask } from "../api/task";

const Context = React.createContext({ name: "Default" });

const TaskEditPage: React.FC = () => {
  useAuth();

  const params = useParams();

  const [task, setTask] = React.useState<API.TaskItem | undefined>();

  const [api, contextHolder] = notification.useNotification();
  const contextValue = React.useMemo(() => ({ name: "Ant Design" }), []);

  const action: string = params.id ? "Update" : "Create";

  const { data, isLoading, isSuccess, error } = useQuery<
    Promise<any>,
    AxiosError,
    API.CommonResp<API.TaskItem>,
    any
  >({
    queryKey: ["task"],
    queryFn: () => getTask(params.id),
    enabled: !!params.id,
  });

  React.useEffect(() => {
    if (isSuccess && data) {
      setTask({
        title: data.data.title,
        detail: data.data.detail,
        scheduled_date: moment(data.data.scheduled_date),
      });
    }
    if (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("authtoken");
      }
    }
    if (action === "Create") setTask(undefined);
  }, [data, isLoading, isSuccess, error, action]);

  const saveTaskMutation = useMutation({
    mutationFn: (formData: API.TaskItem) => {
      if (params.id) return updateTask(params.id, formData);
      else return createTask(formData);
    },
    onSuccess: (response) => {
      api.success({ message: response.data.message, placement: "topRight" });
    },
  });

  const handleSubmit = (data: TaskData) => {
    data.scheduled_date = moment(data.scheduled_date).toISOString();
    saveTaskMutation.mutate(data);
  };

  return (
    <Block>
      <Context.Provider value={contextValue}>
        {contextHolder}
        <TaskForm
          pending={saveTaskMutation.isLoading}
          onSubmit={handleSubmit}
          action={action}
          task={task}
        />
      </Context.Provider>
    </Block>
  );
};

export default TaskEditPage;
