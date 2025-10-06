"use client";
import React from "react";
import AuthLayout from "@/app/core/auth/AuthLayout";
import ResetPasswordForm from "@/app/core/auth/resetPassword/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
