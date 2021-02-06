import React, { useState } from 'react';
import { map,distinctUntilChanged, switchMap,buffer,debounceTime, withLatestFrom, filter, repeat, scan} from 'rxjs/operators'
import {interval, of,fromEvent,never} from "rxjs";
import {useObservableState, useObservable, pluckFirst} from 'observable-hooks'

const TimeWrapper = () => {
    const [state, setState] = useState('stop');

    const timerState$ = useObservable(pluckFirst, [state]);

    const countDown$ = useObservable( () =>
        timerState$.pipe(
            map(state => state === 'stop'),
            distinctUntilChanged(),
            switchMap(stop =>
                {
                    console.log(stop);
                    return stop ? of(0) :
                    interval(1000)
                        .pipe(
                            repeat(),
                            map(startTime => startTime+1),
                            distinctUntilChanged(),
                            withLatestFrom(timerState$),
                            filter(([, state]) => state === 'start'),
                            scan(time => time +1, 0)
                        )}
            )

        )
    );

    const stop = () => {
        setState(state==='start' ? 'stop' : 'start')
    };

    const handleClickForReset =()=>{
        setState('stop');
        setTimeout(()=> setState('start'), );
    };

    const handleClickForWait =(e)=>{
        const click$ = fromEvent(e.nativeEvent.target, 'click');
        click$.pipe(
            buffer(
                click$.pipe(debounceTime(300))
            ),
            distinctUntilChanged(),
            map(list => list.length),
            filter(x => x === 2),
            switchMap(res => {
                if(res===2) {
                    setState('pause');
                    return []
                }
                return never()
            })
        );

    };


    const time = useObservableState(countDown$, 0);

    const getCurrentTime = (time)=>{
        return time < 10 ? '0' + time : time
    };

    const minutes = getCurrentTime(Math.floor(time / 60));
    const hours = getCurrentTime(Math.floor(time / 60 / 60));
    const seconds = getCurrentTime(Math.floor(time % 60));

    return (
        <div>
            <p>{hours}:{minutes}:{seconds}</p>
            <button onClick={()=>stop()}>{state==='start' ? 'Stop' : 'Start'}</button>
            <button onClick={handleClickForWait}>Wait</button>
            <button onClick={handleClickForReset}>Reset</button>
        </div>
    );
}


export default TimeWrapper;