import { useState, useEffect, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "@/providers/store";
import { authService } from "@/services/auth/auth-services";
import { LoginFormData } from "@/app/core/interfaces/auth-interfaces";
import showToast from "@/utils/alerts";

const MAX_TRIES = 3;
const BLOCK_MINUTES = 15;

export function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    reset,
  } = useForm<LoginFormData>();
  const dispatch = useDispatch();

  const [showPss, setShowPss] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [blockAccess, setBlockAccess] = useState(false);
  const [trys] = useState(MAX_TRIES);
  const [failedTry, setFailedTry] = useState(MAX_TRIES);
  const [showTry, setShowTry] = useState(false);
  const [blockTime, setBlockTime] = useState<number | null>(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setValue("username", savedUsername);
      setRememberMe(true);
    }
  }, [setValue]);

  useEffect(() => {
    if (blockAccess && blockTime) {
      const timeout = setTimeout(() => {
        setBlockAccess(false);
        setFailedTry(MAX_TRIES);
        setShowTry(false);
        setBlockTime(null);
      }, BLOCK_MINUTES * 60 * 1000);
      return () => clearTimeout(timeout);
    }
  }, [blockAccess, blockTime]);

  const onSubmit: SubmitHandler<LoginFormData> = useCallback(
    async (data) => {
      showToast(data.username, "info");
      try {
        const user = await authService.login(data.username, data.password);
        dispatch(login(user));
        if (rememberMe) {
          localStorage.setItem("username", data.username);
        } else {
          localStorage.removeItem("username");
        }
        localStorage.setItem("sidebarOpen", "1");
      } catch (error: unknown) {
        const errorAsError = error as Error;
        setShowTry(true);
        setFailedTry((prev) => {
          if (prev === 1) {
            setError("username", { type: "blockedUsername" });
            setError("password", { type: "blockedPassword" });
            setBlockAccess(true);
            setBlockTime(Date.now() + BLOCK_MINUTES * 60 * 1000);
          }
          return prev === 0 ? 0 : prev - 1;
        });
        if (errorAsError.message === "Invalid username or password") {
          setError("username", { type: "controlAccess" });
          setError("password", { type: "controlAccess" });
        }
      }
    },
    [dispatch, rememberMe, setError]
  );

  const getLabelTry = () => {
    return failedTry < 1
      ? `${MAX_TRIES} intentos fallidos. esperar ${BLOCK_MINUTES}min para volver intentarlo`
      : `Intento fallido, quedan ${failedTry}/${trys} intentos`;
  };

  return {
    register,
    handleSubmit,
    errors,
    setValue,
    setError,
    showPss,
    setShowPss,
    rememberMe,
    setRememberMe,
    blockAccess,
    showTry,
    getLabelTry,
    onSubmit,
  };
}