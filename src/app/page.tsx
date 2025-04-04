"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirigir a la ruta de login
    router.push("/login");
  }, [router]);

  return null; // No renderizamos nada en esta página
};

export default HomePage;
