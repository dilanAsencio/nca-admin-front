"use client"
import React from 'react';
import { Provider } from "react-redux";
import store from "@/providers/store";

const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <Provider store={store}><main >{children}</main></Provider>;
};

export default ClientProvider;