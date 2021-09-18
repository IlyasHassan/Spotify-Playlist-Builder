import React from 'react';

const Detail2 = props => {

    return (
        <div class="img-group" >
            
                
                {
                    props.items.map((item, idx) => 
                    <img key={idx}
                        src={item.track.album.images[0].url}
                        
                        
            
                            
                            
                            ></img>
                    
                    
                    )

                    
                }
                
            

        
                
        </div>
        

    );
}

export default Detail2;