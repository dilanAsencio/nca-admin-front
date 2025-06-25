"use client";
import React from "react";
import LoginForm from "@/components/auth/login/LoginForm";
import AuthLayout from "@/components/auth/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
