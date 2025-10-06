"use client";
import React from "react";
import AuthLayout from "@/app/core/auth/AuthLayout";
import ForgotPasswordForm from "@/app/core/auth/forgotPassword/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
