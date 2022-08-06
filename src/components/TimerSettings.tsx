import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { setTime } from '../store/slices/tasksSlice'

const TimerSettings: FC<{setActive: (value: boolean) => void}> = ({setActive}) => {
    const time = useAppSelector(state => state.tasks.time)
    const dispatch = useAppDispatch()
    const [minutes, setMinutes] = useState<number>(Math.floor(time / 60))

    useEffect(() => {
        setMinutes(Math.floor(time / 60))
    }, [time])

    const handleEditTime = () => {
        if (minutes && minutes < 1000){
            dispatch(setTime(minutes * 60))
            setActive(false)
        }
    } 
    
    return (
        <>
            <div className='settings'>
                <div className='settings__title'>
                    <div>Timer setting</div>
                    <i className="material-icons settings__title-close" onClick={() => setActive(false)}>close</i>
                </div>
                <div>Time (minutes)</div>
                <div className='settings__content'>
                    <label htmlFor="pomodoro_edit_input">Pomodoro</label>
                    <input type="number" id='pomodoro_edit_input' className='browser-default settings__content-input' min='0' max={999} step='1' value={minutes} onChange={(e) => setMinutes(+e.target.value)}/>
                </div>
            </div>
            <div className='modal-footer'>
                <button className={classNames('save-btn', {'active':  minutes && minutes < 1000})} disabled={!(minutes || minutes < 1000)} onClick={handleEditTime}>Ok</button>
            </div>
        </>
    )
}

export default TimerSettings
