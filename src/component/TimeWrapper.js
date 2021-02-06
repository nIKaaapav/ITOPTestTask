import React, { useState } from 'react';
import ButtonGroup from "./ButtonGroup";
import Timer from "./Timer";

const TimeWrapper = () => {
    const [state, setState] = useState('stop');

    return (
        <div>
            <Timer state={state}/>
            <ButtonGroup state={state} changeState={setState}/>
        </div>
    );
};


export default TimeWrapper;