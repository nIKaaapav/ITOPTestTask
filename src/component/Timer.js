import React from 'react';
import {pluckFirst, useObservable, useObservableState} from "observable-hooks";
import {distinctUntilChanged, filter, map, repeat, scan, switchMap, withLatestFrom} from "rxjs/operators";
import {interval, of} from "rxjs";

const Timer = ({state}) => {
    const timerState$ = useObservable(pluckFirst, [state]);

    const countDown$ = useObservable( () =>
        timerState$.pipe(
            map(state => state === 'stop'),
            distinctUntilChanged(),
            switchMap(stop =>
                {
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

    const time = useObservableState(countDown$, 0);

    const getCurrentTime = (time)=>{
        return time < 10 ? '0' + time : time
    };

    const minutes = getCurrentTime(Math.floor(time / 60));
    const hours = getCurrentTime(Math.floor(time / 60 / 60));
    const seconds = getCurrentTime(Math.floor(time % 60));


    return (
        <p>{hours}:{minutes}:{seconds}</p>
    );
};

export default Timer;