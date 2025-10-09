"use client";
import React from "react";
import AuthLayout from "@/app/core/auth/AuthLayout";
import PublicChangePasswordForm from "@/components/public/publicChangePassword/PublicChangePasswordForm";

const PublicChangePasswordPage = () => {
  return (
    <AuthLayout>
      <PublicChangePasswordForm />
    </AuthLayout>
  );
};

export default PublicChangePasswordPage;
