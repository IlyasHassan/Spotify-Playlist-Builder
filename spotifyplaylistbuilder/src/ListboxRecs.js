import React from 'react';

const Listbox = props => {



    //const finalArray = props.items.sort(() => Math.random() - Math.random()).slice(0, 10);


    return (
        <div >
            <div class="btn-group">
                
                {
                    props.items.map((item, idx) => 
                    <button key={idx}
                        className = "track-btn"
                        
                            >

                            {item.name}
                    </button>)
                }
            </div>
        </div>
        

    );
}

export default Listbox;