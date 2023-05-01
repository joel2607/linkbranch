import { useState } from 'react';
import Axios from 'axios';

const route = Axios.create({
  baseURL: "http://localhost:3000/api"
});

export default function LinkAdd({session}){
  if(!session.data) return null;

  const [linkname, setlinkname] = useState("");
  const [link, setlink] = useState("");

  async function addlink(email, linkName, link){ //We can use email to 

    try {
      const res = await route.post("/addlinks",{useremail:email, linkname: linkName, link:link.toLowerCase()});
      console.log(res.data);
    } catch (err) {
        console.log(err);
    }
  }
  
  return (
        <div>
          <div className='form'>
            Add Link
            <div>
              <label type = "text">Name:</label><br/>
              <input type = "text" onChange={(event) => setlinkname(event.target.value)} value = {linkname}></input>
            </div>
            <div>
              <label type = "text">Link:</label><br/>
              <input type = "text" onChange={(event) => setlink(event.target.value)} value = {link}></input>
            </div>
            
            <div>
              <input type = "submit" value="Add Link" onClick={() => addlink(session.data.user.email, linkname, link) }></input>
            </div>
          </div>
        </div>
    )
}