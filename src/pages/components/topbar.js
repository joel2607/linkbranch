import Image from 'next/image'
import { signIn, signOut} from 'next-auth/react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

export default function Topbar({session}){
    

  if(!session.data){
  
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
          >
            <AccountTreeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, }}>
            LinkBranch
          </Typography>
          <Button color="inherit" onClick={() => signIn('google')}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
        

    );
  }

  else{

    return (
    <>
    <div className='topbar'>
        <div style={{
            position: "relative",
            flexGrow:6,
            justifyContent: 'center',
            alignContent: 'center'
            }}>
            Link Branch
        </div>

        <div style={{
        position: "relative",
        flexGrow: 1,
        width: "fit-content",
        justifyContent: 'center',
        alignItems: 'center'
        }}>
        <Image 
            src = {session.data.user.image} 
            height = "50" width = "50"
            style={{
            borderRadius :"50%",
            }}
            alt='User Profile Picture'></Image>
        </div>

        <div style={{
        position: "relative",
        flexGrow:1,
        justifyContent: 'center',
        alignContent: 'center'
        }}>
        
        Signed in as {session.data.user.name}
        </div>

        <div style={{flexGrow:1,}}>
            <button onClick={() => signOut()} className="signinoutbtn">Sign out</button>
        </div>

    </div>
    </>
    );
  }
}