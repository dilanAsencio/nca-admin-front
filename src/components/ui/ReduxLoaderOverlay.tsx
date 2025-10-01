"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/providers/store";
import FullScreenLoader from "./FullScreenLoader";
import { useUI } from "@/providers/ui-context";

const ReduxLoaderOverlay = () => {
  const { isLoading } = useUI();
  return isLoading ? <FullScreenLoader /> : null;
};

export default ReduxLoaderOverlay;