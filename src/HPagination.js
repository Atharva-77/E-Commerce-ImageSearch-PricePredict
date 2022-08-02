    import React from 'react'
import './HPagination.css'

function HPagination({postPerPage,totalPost,paginate}) {
    const PgNo=[];
    console.log("HPAGE",postPerPage,totalPost,paginate);
    for(let i=1;i<=Math.ceil(totalPost/postPerPage);i++)
    {
        PgNo.push(i)
        console.log("PgNo",PgNo);
    }
    
    return (
        <div className="page">
            {PgNo.map(num => (
            
                <button  className="button_space" onClick={()=>{paginate(num)}}>
  
                       {num}
                 </button>
            
               
            ))}
        </div>
    )
}

export default HPagination
