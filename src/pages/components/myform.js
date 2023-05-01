import { useState } from 'react';
import Axios from 'axios';

const route = Axios.create({
  baseURL: "http://localhost:3000/api"
});

export default function Myform({session}){
  if(!session.data) return null;

  const [username, setUsername] = useState("");

  async function addUsername(email, userName){ //We can use email to 

    try {
      const res = await route.post("/userdata",{useremail:email, username: userName.toLowerCase()});
      console.log(res.data)
    } catch (err) {
        console.log(err);
    }
  }
  
  return (
        <div>
          <form className = "form">
            <div>
              <label type = "text">Enter Username:</label><br/>
              <input type = "text" name='username' onChange={(event) => setUsername(event.target.value)} value = {username}></input>
            </div>
            
            <div>
              <input type = "submit" value = "Set Username" onClick={() => addUsername(session.data.user.email, username)}></input>
            </div>
          </form>
        </div>
    )
}