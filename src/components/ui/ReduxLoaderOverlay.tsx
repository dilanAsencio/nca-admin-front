"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/providers/store";
import FullScreenLoader from "./FullScreenLoader";

const ReduxLoaderOverlay = () => {
  const loading = useSelector((state: RootState) => state.auth.loading);
  return loading ? <FullScreenLoader /> : null;
};

export default ReduxLoaderOverlay;