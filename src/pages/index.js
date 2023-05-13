import Head from 'next/head'

import {useSession } from 'next-auth/react';

import Userform from './components/UserForm';
import Topbar from './components/Topbar';
import MainPageBody from './components/MainPageBody';
import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function Home() {

  const session = useSession();
  const [username, setUsername] = useState("");
  return ( 

    <>
      <Head>
        <title>LinkBranch</title>
        <meta name="description" content="A rip-off from LinkTree" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Topbar session={session}></Topbar>
      
      
      
      <Card sx={{
        position: "relative",
        display: (session.data)?"none":"flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        margin: "10px 10px 10px 10px",
        height: "88vh",
      }}>
        <CardContent sx = {{ position:"absolute"}}>

          {/* <Typography variant = "h4">
          Welcome to LinkBranch<br/><br/>
          </Typography>  */}

          <Typography variant = "h6" sx={{fontWeight:"normal"}}>
            Sign in to claim your domain at 
          </Typography>

          <TextField
            label="/your-username"
            value={username}
            size='small'
            variant='standard'
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />

        </CardContent>
      </Card>

      <MainPageBody session = {session}></MainPageBody>
      <Userform session = {session}></Userform>
      
    </>
      
  );
  
}
