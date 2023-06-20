import * as React from "react";
import { Avatar, List, Pagination, Popconfirm, Button } from "antd";
import { Link } from "react-router-dom";

interface TaskListProps {
  pending: boolean;
  tasks: API.TaskListRespDataItem[];
  total: number | undefined;
  onDelete: (id: string) => void;
  onPaginateChange: (page: number, pageSize: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  pending,
  tasks,
  total,
  onDelete,
  onPaginateChange,
}) => {
  return (
    <>
      <List
        dataSource={tasks}
        loading={pending}
        renderItem={(item, index) => (
          <>
            <List.Item
              actions={[
                <Link to={"tasks/edit/" + item._id}>Edit</Link>,
                <Popconfirm
                  placement="leftBottom"
                  title="Are you sure to delete this task?"
                  onConfirm={() => onDelete(item._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link">Delete</Button>
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                }
                title={<Link to={"tasks/edit/" + item._id}>{item.title}</Link>}
                description={item.detail}
              />
            </List.Item>
          </>
        )}
      />

      <Pagination
        defaultCurrent={1}
        onChange={onPaginateChange}
        total={total}
      />
    </>
  );
};

export default TaskList;
