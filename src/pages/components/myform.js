import { useState } from 'react';
import Axios from 'axios';

const route = Axios.create({
  baseURL: "/api/"
});

export default function Myform({session}){
  if(!session.data) return null;

  const [username, setUsername] = useState("");

  function addUsername(userName){
    route.post("/userdata",{username: userName}).catch((err) => console.log(err));
  }
  
  return (
        <div>
          <form className = "form">
            <div>
              <label type = "text">Enter Username:</label><br/>
              <input type = "text" name='username' onChange={(event) => setUsername(event.target.value)} value = {username}></input>
            </div>
            
            <div>
              <input type = "submit" onClick={() => addUsername(username)}></input>
            </div>
          </form>
        </div>
    )
}