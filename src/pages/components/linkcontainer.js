export default function LinkContainer({data}){
    return (
        <a href={data.link}>
            <div className="linkcontainer">
                {data.name}
            </div>
        </a>
        
    )
}