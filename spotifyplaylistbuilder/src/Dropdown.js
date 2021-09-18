import React from 'react';
import { Typography } from '@mui/material';
import { Select, MenuItem } from '@mui/material';

const Dropdown = props => {    

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

            <Select value={props.selectedValue} onChange={dropdownChanged} >

            <option key={0}>Select...</option>

                
                {props.options.map((item, idx) => <MenuItem key={idx + 1} value={item.id}>{item.name}</MenuItem>)}

            </Select> 
            </div>           
        </div>
    );
}

export default Dropdown;