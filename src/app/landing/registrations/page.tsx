"use client";
import React, { useEffect } from "react";

import { useLanding } from "@/providers/landing-context";
import MainRegistrations from "./components/MainRegistrations";

const AdmissionsPage: React.FC = () => {
  const { handleMenu } = useLanding();

  useEffect(() => {
    handleMenu("registrations");
  }, []);

  return (
    <>
      <MainRegistrations />
    </>
  );
};

export default AdmissionsPage;
