import Head from 'next/head'

import {useSession } from 'next-auth/react';

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

    let _currentUser;
    route.get("/userdata")
    .then((res)=>{
        const users = res.data.users.slice();

        _currentUser = users.find((user) => user.email == session.data.user.email);
        // Get current user object by matching emails

        if(_currentUser.username) return;
        // Check if current user object already has a username
        
        let randomUsername = generateUsername();
        while(users.find((user) => user.username && user.username == randomUsername)) randomUsername = generateUsername();
        // If username exists in database, generate new one

        setCurrentUser({..._currentUser, username: randomUsername});
        // Hook it up with a username
    })
    .catch((err)=> console.log(err));

    

  }, [session])

  useEffect(() => {
    if(!currentUser) return;
    // Check if user is logged in

    route.post("/userdata",{...currentUser})
    .then().catch((err) => console.log(err));
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
      
      
      
      <Alert sx = {{display: alert?"flex":"none"}} variant = "outlined" severity = "info" onClose = {() => setAlert("")}>{alert}</Alert>
      <Card sx={{ position: "relative", display:(session.data)?"none":"flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", margin: "10px 10px 10px 10px", height: "88vh",}}>
        <CardContent sx = {{ position:"absolute"}}>
          

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
