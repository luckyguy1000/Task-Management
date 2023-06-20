import * as React from "react";
import { AxiosError } from "axios";
import { Button, Space, Typography, Input } from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Block from "../components/common/Block";
import TaskList from "../components/task/TaskList";
import { deleteTask, taskList } from "../api/task";
import { useAuth } from "../utils/auth";

const { Title } = Typography;

const TaskListPage: React.FC = () => {
  const nagivate = useNavigate();
  const [, setToken] = useAuth();

  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [searchKey, setSearchKey] = React.useState<string>("");

  const { data, isLoading, isSuccess, error, refetch } = useQuery<
    Promise<any>,
    AxiosError,
    API.CommonResp<API.TaskListRespData>,
    any
  >({
    queryKey: ["tasks"],
    queryFn: () => taskList(page, pageSize, searchKey),
  });

  const handlePaginateChange = (pageNo: number, pageS: number) => {
    setPage(pageNo);
  };

  React.useEffect(() => {
    if (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("authtoken");
        setToken("");
      }
    }
  }, [error]);

  React.useEffect(() => {
    refetch();
  }, [page, pageSize, searchKey]);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return deleteTask(id);
    },
    onSuccess() {
      refetch();
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleSearch = (value: string) => {
    setSearchKey(value);
  };

  const signOut = () => {
    localStorage.removeItem("authtoken");
    setToken("");
  };

  return (
    <Block>
      <div style={{ textAlign: "center", margin: "15px 0" }}>
        <Title level={2}>TASK LIST</Title>
        <Space>
          <Button type="primary" onClick={() => nagivate("tasks/new")}>
            New Task
          </Button>
          <Button type="default" onClick={signOut}>
            Sign Out
          </Button>
        </Space>
        <hr />
        <Input.Search
          placeholder="input search text"
          onSearch={handleSearch}
          style={{ width: "100%" }}
        />
      </div>
      <TaskList
        pending={isLoading}
        tasks={isSuccess ? data.data.tasks : []}
        total={data?.data.total}
        onDelete={handleDelete}
        onPaginateChange={handlePaginateChange}
      />
    </Block>
  );
};

export default TaskListPage;
