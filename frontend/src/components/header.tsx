'use client';

import { authService } from "@/axios/auth";
import AuthContext from "@/context/authContext";
import { AppBar, Container, Button, Toolbar, Typography, Avatar, IconButton, Icon } from "@mui/material";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react"

export default function Header() {
  const auth = useContext(AuthContext);

  const router = useRouter();
  const [leave, setLeave] = useState(false);

  const logOut = async () => {
    try {
      const success = await authService.logOut();
      setLeave(true);
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error(err);
    }
  }

  if(leave) {
    router.push('/logIn');
  }

  let userInfo;
  if(auth) {
    userInfo = (
      <span className="flex align-middle space-x-2">
        <span className="flex">
          <p className="m-auto">Welcome {auth.email}</p>
          <IconButton>
            <Avatar>U</Avatar>
          </IconButton>
        </span>
        <Button className="m-auto" variant="contained" onClick={logOut} size="small">Log Out</Button>
      </span>
    );
  } else {
    userInfo = (
      <span className="space-x-2">
        <Link href={'/logIn'}>
          <Button variant="contained" size="small">
            Login
          </Button>
        </Link>
        <Link href={'/register'}>
          <Button variant="outlined" size="small">
            Register
          </Button>
        </Link>
      </span>
    );
  }

  let userMenu;
  if(auth) {
    userMenu = (
      <span className="space-x-2">
        <Link href="/patients">
          <Button color="inherit">
            Patients
          </Button>
        </Link>
      </span>
    );
  } else {
    userMenu = (
      <>
      </>
    );
  }

  console.log(auth);

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Link href={'/'}>
          <Typography variant="h5" component="div">
            Development Challenge Nine
          </Typography>
        </Link>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {userMenu}
        </Typography>
        {userInfo}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      ></Toolbar>
    </>
  )
}
