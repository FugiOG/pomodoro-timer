import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { getPadTime } from '../services/getPadTime';
import { increaseAct } from '../store/slices/tasksSlice';
import {Helmet} from 'react-helmet';
import useSound from 'use-sound';
import clockSound from '../sounds/alarm_clock_sound.mp3';
import timerPng from '../images/timer.png';
import SettingsModal from './SettingsModal';

const Timer: FC = () => {
    const {activeTaskId, tasksList, time} = useAppSelector(state => state.tasks)

    const [timeLeft, setTimeLeft] = useState<number>(time)
    const [isCounting, setIsCounting] = useState<boolean>(false) 
    const [numberOfPomos, setNumberOfPomos] = useState<number>(1)

    const [play] = useSound(clockSound, {volume: 1})

    const dispatch = useAppDispatch();

    const taskName = tasksList.filter(item => item.id === activeTaskId)[0]?.title || 'Time to focus!'

    const sendNotification = (title: string, body?: string) => {
        Notification.requestPermission().then((permission) => {
            console.log(permission);
            if (permission === "granted") {
                const notification = new Notification(title, {
                    body: body || title,
                    icon: timerPng
                });
            }
        });
    }


    const minutes: number = Math.floor(timeLeft / 60)
    const seconds: number = timeLeft - minutes * 60

    useEffect(() => {
        const intervalId = setInterval(() => {
            isCounting && setTimeLeft(prev => prev >= 1 ? prev - 1 : 0)
        }, 1000)

        if (timeLeft === 0) {
            setIsCounting(false)
            play()
            setNumberOfPomos(prev => prev + 1)
            setTimeLeft(25 * 60)
            dispatch(increaseAct(activeTaskId))
            sendNotification("It's time to take a break!")
        }
        if (timeLeft === 300){
            sendNotification("5 minutes left!")
        }

        return () => {
            clearInterval(intervalId)
        }
    }, [timeLeft, isCounting])

    const handleStart = () => {
        if (timeLeft === 0) setTimeLeft(25 * 60)
        setIsCounting(true)
    }
    const handleStop = () => {
        setIsCounting(false)
    }

    const handleReset = () => {
        setIsCounting(false)
        setNumberOfPomos(prev => prev + 1)
        dispatch(increaseAct(activeTaskId))
        setTimeLeft(25 * 60)
    }

    return (
        <>
            <div className='timer-wrap'>
                <div className="timer">
                    <span>{getPadTime(minutes)} : {getPadTime(seconds)}</span>
                    {/* <div>:</div> */}
                    {/* <span>{getPadTime(seconds)}</span> */}
                </div>
                {isCounting ? (
                    <div className='block-flex'>
                        <button className="btn-large waves-effect start-button white" type="submit" name="action" onClick={handleStop}>Stop</button> 
                        <i className="material-icons reset-btn" onClick={handleReset}>fast_forward</i>       
                    </div>
                    ):(
                    <button className="btn-large waves-effect start-button white" type="submit" name="action" onClick={handleStart}>Start</button>
                )}
            </div>
            <div className='current-task'>
                <div className="number">#{numberOfPomos}</div>
                <div className='name'>{taskName}</div>
            </div>
            <Helmet>
                <title>{getPadTime(minutes)}:{getPadTime(seconds)} - {taskName}</title>
            </Helmet>
        </>
    )
}

export default Timer