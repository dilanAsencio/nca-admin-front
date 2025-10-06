"use client";
import React from "react";
import LoginForm from "@/app/core/auth/login/LoginForm";
import AuthLayout from "@/app/core/auth/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
