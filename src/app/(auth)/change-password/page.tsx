"use client";
import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import ChangePasswordForm from "@/components/auth/changePassword/ChangePasswordForm";

const ChangePasswordPage = () => {
  return (
    <AuthLayout>
      <ChangePasswordForm />
    </AuthLayout>
  );
};

export default ChangePasswordPage;
