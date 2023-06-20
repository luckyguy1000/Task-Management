import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Block from "../components/common/Block";
import SignupForm, { SignupData } from "../components/auth/SignupForm";
import { register } from "../api/auth";
import { useGuestMode } from "../utils/auth";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const isGuest = useGuestMode();

  const registerMutation = useMutation({
    mutationFn: (formData: SignupData) => {
      return register(formData);
    },
    onSuccess: (response, variables, context) => {
      const data: API.UserRegisterResp = response.data;
      console.log(data);
      if (data.id) {
        navigate("/signin");
      }
    },
  });

  const handleSubmit = (input: SignupData) => {
    registerMutation.mutate(input);
  };

  if (!isGuest) {
    return null;
  }

  return (
    <Block>
      <SignupForm
        pending={registerMutation.isLoading}
        onSubmit={handleSubmit}
      />
    </Block>
  );
};

export default Signup;
