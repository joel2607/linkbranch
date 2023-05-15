import { signIn, signOut} from 'next-auth/react';

import AccountTreeIcon from '@mui/icons-material/AccountTree';
import EditIcon from '@mui/icons-material/Edit';
import { AppBar, Tooltip, Toolbar, Typography, TextField, Button, Box, Menu, Avatar, IconButton, MenuItem, Divider, InputAdornment} from '@mui/material';

import axios from 'axios';
import { useEffect, useState } from 'react';

const route = axios.create({
  baseURL: "http://localhost:3000/api"
});

export default function Topbar({session, showAlert}){

  const [focusElement, setFocusElement] = useState(null);
  const [username, setUsername] = useState("");

  function editUsername(newUsername){
    if(!session.data) return;

    route.get("/userdata")
    .then((res)=>{
        const users = res.data.users.slice();
        setFocusElement(null);
        if(users.find((user) => user.username && user.username == newUsername)) showAlert("Username already exists.");
        else{
          route.post("/userdata",{...session.data.user, username: newUsername})
          .then().catch((err) => console.log(err));
          showAlert("Username Edited");
        }
      })
    .catch((err)=> console.log(err));

    
  }

    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href="\"
          >
            <AccountTreeIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, }}>
            LinkBranch
          </Typography>

          <Avatar 
            src = {(session.data)?session.data.user.image:""} 
            sx={{
            display: session.data?"block":"none",
            mr: 2
            }}
            alt='User Profile Picture'
            onClick = {(event) => setFocusElement(event.currentTarget)}
          ></Avatar>

          <Menu
            anchorEl={focusElement}
            open={Boolean(focusElement)}
            onClose={()=>setFocusElement(null)}
            sx = {{
              mt: "1.5vh",
              display: "flex",
              alignItems: "center"
            }}
            
          >
            <MenuItem >
              <Typography variant = "body1" sx={{fontWeight:"normal"}}>
                {session.data && session.data.user.name || ""}
              </Typography>
            </MenuItem>
            <MenuItem >
              <Typography variant = "body2" sx={{fontWeight:"normal"}}>
                {session.data && session.data.user.email || ""}
              </Typography>
            </MenuItem>
            <Divider/>
            <MenuItem >
              <TextField label="Edit your username" value={username} size='small' variant='standard'
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <IconButton onClick={()=>editUsername(username)}>
                <EditIcon/>
              </IconButton>
            </MenuItem>
          </Menu>

          <Button onClick={() => signOut()} sx = {{display: session.data?"block":"none"}}>Sign out</Button>
          <Button color="inherit" onClick={() => signIn('google')} sx = {{display: (!session.data)?"block":"none"}} >Login </Button>
        </Toolbar>
      </AppBar>
    </Box>

    );
}