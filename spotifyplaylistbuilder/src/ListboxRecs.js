import React from 'react';
import { Typography } from '@mui/material';

const ListboxRecs = props => {




    return (

            <div class="btn-group" >
                
                {
                    props.items.map((item, idx) => 
                    <button key={idx}
                        className = "track-btn"
                        
                        >
                            <Typography variant="h5" gutterBottom component="div">
                            <b>{item.artists[0].name}</b>
                </Typography> 
                            
 

                            
                            <Typography variant="h5" gutterBottom component="div">
                            {item.name}
                </Typography> 
                            <br></br>
                            
                    </button>
                    
                    )

                    
                }
                
            </div>
            

        
                

        

    );
}

export default ListboxRecs;