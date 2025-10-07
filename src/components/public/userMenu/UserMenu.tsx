"use client";

import React from "react";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  clearCredentials,
  persistor,
  publicLogoutThunk,
} from "@/providers/store/public-auth-store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import * as alerts from "@/utils/alerts";

interface UserMenuProps {
  onLogout?: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onLogout }) => {
  const dispatch = useDispatch<AppDispatch>();
  const username = localStorage.getItem("username");
  const showToast = alerts.showToast;

  const handleLogout = async () => {
    dispatch(publicLogoutThunk())
      .unwrap()
      .then(async () => {
        dispatch(clearCredentials())
        await persistor.purge(); 
        persistor.pause();
        await persistor.flush();
        persistor.persist();
        showToast("Sesión cerrada correctamente", "success");
        if (onLogout) onLogout();
      })
      .catch(() => {
        showToast("Error al cerrar sesión", "error");
      })
      .finally(() => {
        window.location.href = '/landing'; 
      });
  };

  return (
    <div className="flex flex-col items-center gap-3 bg-white shadow-md rounded-lg px-4 py-2">
      <FontAwesomeIcon icon={faUserCircle} size="3x"  className="text-gray-600" />
      <span className="text-sm font-medium text-gray-700">{username}</span>
      <button
        onClick={handleLogout}
        className="ml-4 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
