import instance from "..";

export const login = (formData: API.UserLoginReq) =>
  instance.post<string, API.CommonResp>("auth/login", formData);

export const register = (formData: API.UserRegisterReq) =>
  instance.post<string, API.CommonResp>("auth/register", formData);
