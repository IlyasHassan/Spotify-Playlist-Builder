import React from 'react';
import { Typography } from '@mui/material';

const Listbox = props => {




    return (
        <div >
            <div class="btn-group" >
                
                {
                    props.items.map((item, idx) => 
                    <button key={idx}
                        className = "track-btn"
                        
                        id={item.track.id}>
                            <Typography variant="h5" gutterBottom component="div">
                            <b>{item.track.artists[0].name}</b>
                </Typography> 
                            
 

                            
                            <Typography variant="h5" gutterBottom component="div">
                            {item.track.name}
                </Typography> 
                            <br></br>
                            
                    </button>
                    
                    )

                    
                }
                
            </div>
            

        
                
        </div>
        

    );
}

export default Listbox;