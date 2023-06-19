import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import Block from "../components/common/Block";
import SigninForm, { SigninData } from "../components/auth/SigninForm";
import { login } from "../api/auth";
import { useAuth, useGuestMode } from "../utils/auth";

const Signin: React.FC = () => {
  const [, startNavigation] = React.useTransition();
  const [, setToken] = useAuth();
  const isGuest = useGuestMode();

  const loginMutation = useMutation({
    mutationFn: (formData: SigninData) => {
      return login(formData);
    },
    onSuccess: (response, variables, context) => {
      const data: API.UserLoginResp = response.data;
      console.log(data);
      if (data.token) {
        const token = data.token;
        localStorage.setItem("authtoken", token);
        startNavigation(() => setToken(token));
      }
    },
  });

  const handleSubmit = (input: SigninData) => {
    loginMutation.mutate(input);
  };

  if (!isGuest) {
    return null;
  }

  return (
    <Block>
      <SigninForm pending={loginMutation.isLoading} onSubmit={handleSubmit} />
    </Block>
  );
};

export default Signin;
