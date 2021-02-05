import React, { useState, useEffect } from 'react';


const TimeWrapper = () => {
    const [seconds, setSeconds] = useState(0);
    const [start, setStart] = useState(false);
    let timerID = null;

    useEffect(() => {
        if (start){
            timerID = setInterval( () => tick(), 1000 );
            return ()=> {
                clearInterval(timerID);
            };

        } else {
            clearInterval(timerID);
        }
    },);


    const  tick = ()=> {
        setSeconds(seconds+1);
    };

    const handleClickForStart = ()=> {
        setStart(!start);
        if(start) {
            setSeconds(0);
        }

    };

    const handleClickForWait =()=>{
        setStart(!start)
    };

    const handleClickForReset =()=>{
        setSeconds(0);
        clearInterval(timerID);
    };

    const currentSeconds = Math.floor((seconds % 60));
    const currentMinutes = Math.floor((seconds % (60*60))/60);
    const currentHours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));


    const getCurrentTime = (time)=>{
        return time < 10 ? '0' + time : time
    };

    return (
        <div>
            <p>{getCurrentTime(currentHours)}:{getCurrentTime(currentMinutes)}:{getCurrentTime(currentSeconds)} </p>
            <button onClick={handleClickForStart}>{start ? 'Stop' : 'Start'}</button>
            <button onClick={handleClickForWait}>Wait</button>
            <button onClick={handleClickForReset}>Reset</button>
        </div>
    );
};


export default TimeWrapper;