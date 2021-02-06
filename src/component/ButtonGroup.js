import React from 'react';

const ButtonGroup = ({state, handleClickForStop, handleClickForWait, handleClickForReset}) => {
    return (
        <div>
            <button onClick={()=>handleClickForStop()}>{state==='start' ? 'Stop' : 'Start'}</button>
            <button onClick={(e)=>handleClickForWait(e)}>Wait</button>
            <button onClick={()=>handleClickForReset()}>Reset</button>
        </div>
    );
};

export default ButtonGroup;