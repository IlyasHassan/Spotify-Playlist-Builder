import React from 'react';


const Dropdown = () => {


    const data = [
        {value: 1, name: 'A'},
        {value: 2, name: 'B'},
        {value: 3, name: 'C'},
    ]

return (
    <div>
        <select>
            {data.map((item, idx) => <option key={idx} value={item.value}> {item.name}</option>)}
        </select>
    </div>
)
}

export default Dropdown;