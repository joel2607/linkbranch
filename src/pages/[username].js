
import Axios from 'axios';
import LinkContainer from './components/linkcontainer';
import Topbar from './components/Topbar';
import { useSession } from 'next-auth/react';

const route = Axios.create({
    baseURL: "http://localhost:3000/api"
});

export async function getServerSideProps(context) {
    const userName = context.params.username.toLowerCase(); // get the value of the dynamic parameter
    const usernameObj = {username:userName,}
    
    try {
        const res = await route.post('/showlinks', usernameObj);
        const links = res.data.links.slice();
    
        return {
          props: { links, userName},
        };
    } catch (err) {
        console.log(err);
        return {
            notFound: true,
        };
    }
}

function Links({links, userName}) {
    const session = useSession();
    return (
        <div>
           <Topbar session = {session}></Topbar>
        <div style = {{
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center'
        }}>
                {userName}'s Links
        </div>
        <br/><br/>
        {links.map(
            (linkdata, index) => {
                return (
                    <div key = {index}>
                        <LinkContainer data = {linkdata} ></LinkContainer>
                        <br/>
                    </div>
                );
            })
        }
       </div> 
    );
  }

export default Links