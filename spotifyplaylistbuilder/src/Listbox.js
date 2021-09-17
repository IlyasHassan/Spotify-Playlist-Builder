import React from 'react';

const Listbox = props => {

    const clicked = e => {
        e.preventDefault();
        props.clicked(e.target.id);
    }


    const finalArray = props.items.sort(() => Math.random() - Math.random()).slice(0, 10);


    return (
        <div className="col-sm-6 px-0">
            <div className="list-group">
                
                {
                    finalArray.map((item, idx) => 
                    <button key={idx}
                        onClick={clicked}
                        className="list-group-item list-group-item-action list-group-item-light"
                        id={item.track.id}>
                            
                            {item.track.name}
                    </button>)
                }
            </div>
        </div>
        

    );
}

export default Listbox;