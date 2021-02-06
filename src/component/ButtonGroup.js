import React from 'react';
import {fromEvent, never} from "rxjs";
import {buffer, debounceTime, distinctUntilChanged, filter, map, switchMap} from "rxjs/operators";

const ButtonGroup = ({state, changeState}) => {

    const handleClickForStop = () => {
        changeState(state==='start' ? 'stop' : 'start')
    };

    const handleClickForReset =()=>{
        changeState('stop');
        setTimeout(()=> changeState('start'), );
    };

    const handleClickForWait =(e)=>{
        const click$ = fromEvent(e.nativeEvent.target, 'click');
        const doubleClick$ = click$.pipe(
            buffer(
                click$.pipe(debounceTime(300))
            ),
            distinctUntilChanged(),
            map(list => list.length),
            filter(x => x === 2),
            switchMap(res => {
                if(res===2) {
                    changeState('pause');
                    return []
                }
                return never()
            })
        );
        doubleClick$.subscribe()

    };


    return (
        <div>
            <button onClick={handleClickForStop}>{state==='start' ? 'Stop' : 'Start'}</button>
            <button onClick={handleClickForWait} disabled={state!=='start'}>Wait</button>
            <button onClick={handleClickForReset} disabled={state!=='start'}>Reset</button>
        </div>
    );
};

export default ButtonGroup;