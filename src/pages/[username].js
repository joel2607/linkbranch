
import Axios from 'axios';

const route = Axios.create({
    baseURL: "http://localhost:3000/api"
  });

export async function getServerSideProps(context) {

    var links = [];
    const userName = context.params.username.toLowerCase(); // get the value of the dynamic parameter
    const usernameObj = {username:userName,}
    var found = false;
    
    route.post("/links",usernameObj)
    .then((res) => {
        links = res.body.links;
        if(links) found = true;
    })
    .catch((err) => console.log(err));
    if(!found){
        return {
            notFound: true
        };
    }
    return {
      props: { links },
    };
}

function Links({links}) {
    return (
       <div>
        {links.map(
            (linkdata) => {
                return (
                    <div>
                        Name: {linkdata.name} <br/>
                        Link: {linkdata.link}    
                    </div>
                );
            })
        }
       </div> 
    );
  }

export default Links