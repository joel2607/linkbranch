
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
          props: { links },
        };
    } catch (err) {
        console.log(err);
        return {
            notFound: true,
        };
    }
}

function Links({links}) {
    return (
       <div>
        {links.map(
            (linkdata, index) => {
                return (
                    <LinkContainer data = {linkdata} key = {index}></LinkContainer>
                );
            })
        }
       </div> 
    );
  }

export default Links