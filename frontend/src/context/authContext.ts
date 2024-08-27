import Auth from "@/interfaces/auth";
import React, { createContext } from "react"

const AuthContext = createContext<Auth | undefined>(undefined);

export default AuthContext;