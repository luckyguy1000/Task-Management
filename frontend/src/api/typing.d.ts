declare namespace API {
  export type CommonResp<T = any> = {
    status: number;
    data: T;
    msg: string;
    error: string;
  };

  export type UserRegisterReq = {
    email: string;
    password: string;
    fullName: string;
  };

  export type UserLoginReq = {
    email: string;
    password: string;
  };

  export type UserLoginResp = {
    token: string;
  };

  export type UserRegisterResp = {
    id: string;
    message: string;
  };

  export type TaskListRespDataItem = {
    _id: string;
    title: string;
    detail: string;
    scheduled_date: string;
  };

  export type TaskItem = {
    title: string;
    detail: string;
    scheduled_date: any;
  };

  export type TaskListRespData = {
    tasks: TaskListRespDataItem[];
    total: number;
  };
}
