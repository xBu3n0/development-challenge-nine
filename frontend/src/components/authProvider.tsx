"use client";

import AuthContext from "@/context/authContext";
import { authService } from "@/axios/auth";
import { useContext, useEffect, useState } from "react";
import Auth from "@/interfaces/auth";
import { useRouter } from "next/navigation";
import Header from "./header";
import Footer from "./footer";
import { AxiosError } from "axios";

interface ReactProps {
  children: React.ReactNode;
  redirect: boolean;
}

export default function AuthProvider({ children, redirect }: ReactProps) {
  const router = useRouter();
  
  const [auth, setAuth] = useState<Auth | undefined>(undefined);
  const [next, setNext] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        const isAuth = await authService.validate();

        setAuth(isAuth);
        setNext(true);
      } catch (err) {
        const axiosError = err as AxiosError;
        console.error(axiosError.code, axiosError.response);
      }
      setFetched(true);
    }

    validateAuth();
  }, []);

  if(redirect && fetched && !next) {
    router.replace('/logIn');
  }

  return (
    <>
      {(next || !redirect) && 
      <AuthContext.Provider value={auth}>
        <Header />
        {children}
        <Footer />
      </AuthContext.Provider>
      }
    </>
  );
}
