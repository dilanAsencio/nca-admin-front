"use client";
import React from "react";
import AuthLayout from "@/app/core/auth/AuthLayout";
import ChangePasswordForm from "@/app/core/auth/changePassword/ChangePasswordForm";

const ChangePasswordPage = () => {
  return (
    <AuthLayout>
      <ChangePasswordForm />
    </AuthLayout>
  );
};

export default ChangePasswordPage;
