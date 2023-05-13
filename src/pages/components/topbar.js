import { signIn, signOut} from 'next-auth/react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Avatar from '@mui/material/Avatar';
import { Tooltip } from '@mui/material';

export default function Topbar({session, username}){

  function handleSignIn(username){


    signIn('google');
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

          <Tooltip text = {(session.data)?session.data.user.name:""}>
            <Avatar 
              src = {(session.data)?session.data.user.image:""} 
              sx={{
              display: session.data?"block":"none",
              mr: 2
              }}
              alt='User Profile Picture'></Avatar>
          
          </Tooltip>
          <Button onClick={() => signOut()} sx = {{display: session.data?"block":"none"}}>Sign out</Button>

          <Button color="inherit" onClick={() => handleSignIn()} sx = {{display: (!session.data)?"block":"none"}} >Login </Button>
        </Toolbar>
      </AppBar>
    </Box>

    );
  // }
}