import React from 'react';
import { Typography } from '@mui/material';

const DropdownSeedGenres = props => {    

    const dropdownChanged = e => {
        props.changed(e.target.value);

    }    

    return (
        <div id="centerItem" >

           
            <div id="centerItem">
            <t >

                <Typography variant="h5" gutterBottom component="div">
                    {props.label}
                </Typography> 
    
            </t>
            </div>

            
            <div id="centerItem">
            

            <br></br>

            <select value={props.selectedValue} onChange={dropdownChanged} >

                <option key={0}>Select...</option>

                {props.options.map((item, idx) => <option key={idx + 1} value={item}>{item}</option>)}

            </select> 
            </div>           
        </div>
    );
}

export default DropdownSeedGenres;