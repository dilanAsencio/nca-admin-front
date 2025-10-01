"use client";
import React from "react";
import PublicRegisterForm from "@/components/public/register/PublicRegisterForm";
import PublicAuthLayout from "@/components/public/PublicAuthLayout";

const RegisterPage = () => {
  return (
    <PublicAuthLayout>
      <PublicRegisterForm />
    </PublicAuthLayout>
  );
};

export default RegisterPage;
