import Head from 'next/head'

import {useSession } from 'next-auth/react';

import Userform from './components/UserForm';
import Topbar from './components/Topbar';
import MainPageBody from './components/MainPageBody';
import { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert'
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import axios from 'axios';

const crypto = require('crypto');

const route = axios.create({
  baseURL: "http://localhost:3000/api"
});

function generateUsername() {
  const bytes = crypto.randomBytes(6);
  const username = bytes.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return username;
}



export default function Home() {

  const session = useSession();
  const [currentUser, setCurrentUser] = useState();

  // initializing first sign-in with a random username
  useEffect(() => {
    if(!session.data) return;

    let _currUser;
    route.get("/userdata")
    .then((res)=>{
        const users = res.data.users.slice();
        _currUser = users.filter((user) => user.email == session.data.user.email)[0];
        setCurrentUser(_currUser);
    })
    .catch((err)=> console.log(err));

    

  }, [session])

  useEffect(() => {
    console.log("state")
    console.log(currentUser)
    if(!currentUser || currentUser.username) return;

    route.post("/userdata",{...currentUser, username: generateUsername()})
    .then((res) => {
      console.log(res.body);
      
    })
    .catch((err) => console.log(err));

    console.log("username added")
  }, [currentUser]);

  const [alert, setAlert] = useState("");
  return ( 

    <>
      <Head>
        <title>LinkBranch</title>
        <meta name="description" content="A rip-off from LinkTree" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Topbar session={session} showAlert = {setAlert}></Topbar>
      
      
      
      <Card sx={{ position: "relative", display:(session.data)?"none":"flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", margin: "10px 10px 10px 10px", height: "88vh",}}>
        <CardContent sx = {{ position:"absolute"}}>
          <Alert sx = {{display: alert?"flex":"none"}} variant = "outlined" severity = "info" >{alert}</Alert>

          <AccountTreeRoundedIcon sx = {{height: "100%", width: "100%"}}/>
          <Typography variant = "h6" sx={{fontWeight:"normal"}}>
            Log in to claim your own domain
          </Typography>

        </CardContent>
      </Card>

      <MainPageBody session = {session}></MainPageBody>
      
    </>
      
  );
  
}
