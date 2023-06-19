declare namespace API {
  export type CommonResp = {
    status: number;
    data: any;
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
}
