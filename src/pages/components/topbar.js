import Image from 'next/image'
import { signIn, signOut} from 'next-auth/react';

export default function Topbar({session}){
    

  if(!session.data){
  
    return (
      <>
        
        <div className='topbar'>
          <button onClick={() => signIn('google')} className="signinoutbtn">Sign in with Google</button>
        </div>
        
      </>
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