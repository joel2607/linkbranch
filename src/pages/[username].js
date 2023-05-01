
import Axios from 'axios';
import LinkContainer from './components/linkcontainer';

const route = Axios.create({
    baseURL: "http://localhost:3000/api"
});

export async function getServerSideProps(context) {
    const userName = context.params.username.toLowerCase(); // get the value of the dynamic parameter
    const usernameObj = {username:userName,}
    
    try {
        const res = await route.post('/links', usernameObj);
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
    return (
       <div>
        <div className="linkcontainer" style = {{
            fontSize: 25,
            fontWeight: 'bold',
            ':hover': { backgroundColor: 'darkblue' }
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