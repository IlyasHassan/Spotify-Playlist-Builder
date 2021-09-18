import React from 'react';

const Listbox = props => {

    const clicked = e => {
        e.preventDefault();
        //props.clicked(e.target.artists.id);
    }


    //const finalArray = props.items.sort(() => Math.random() - Math.random()).slice(0, 10);


    return (
        <div >
            <div class="btn-group">
                
                {
                    props.items.map((item, idx) => 
                    <button key={idx}
                        onClick={clicked}
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