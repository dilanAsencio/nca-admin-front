"use client";

import { useEffect } from "react";
import { authService } from "@/services/auth-services";
import { useRouter } from "next/navigation";

export default function DashboardView() {
  const user = localStorage ? localStorage.getItem("user") : false;
  const router = useRouter();

  useEffect(() => {
    // Redirigir a la ruta de login
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? <p>Welcome, {user}</p> : <p>Please log in.</p>}
      <button className="btn btn-primary" onClick={authService.logout}>
        logOut
      </button>
    </div>
  );
}
