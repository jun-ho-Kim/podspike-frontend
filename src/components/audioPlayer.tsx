import React, { ChangeEvent, ChangeEventHandler, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlayerContext } from '../routers/logged-in-router';

export const AudioPlayer = () => {
    const audioPlayerState = useContext(PlayerContext);
    const slider = useRef<HTMLInputElement>(document.createElement("input"));
    const audio = useRef<HTMLAudioElement>(document.createElement("audio"));
    
    const [volume, setVolume] = useState(50);
    const [duration, setDuration] = useState(20);
    const [currentTime, setCurrentTime] = useState(0);
    
    let intervalHandler: NodeJS.Timeout;

    const secondsToTime = (secondsValue: number) => {
        const HOURTOSECONDS = 3600;
        const MINUTESTOSECONDS = 60;
        const hour = Math.floor(secondsValue / HOURTOSECONDS);
        const minutes = Math.floor(secondsValue / MINUTESTOSECONDS);
        const seconds = Math.floor(secondsValue - hour*HOURTOSECONDS - minutes*MINUTESTOSECONDS);

        return `${hour}:${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
    }
    
    const handleOnCloseClick = () => {
        audioPlayerState?.setIsShowing(false);
        setCurrentTime(0);
        audio.current.currentTime = 0;
    }
    
    const handleOnChangeTime = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("event.target.value", event.target.value)
        setCurrentTime(+event.target.value);
        audio.current.currentTime = +event.target.value;
    };

    const handleOnPlayButton = () =>  {
        if(audioPlayerState?.isPlaying) {
            audio.current.pause();
            if(intervalHandler) clearInterval(intervalHandler)
            audioPlayerState?.setIsPlaying(false);
            console.log("intervalHandler off",intervalHandler)
        } else {
            audio.current.play();
            audioPlayerState?.setIsPlaying(true)
            intervalHandler = setInterval(() => {
                setCurrentTime(audio.current.currentTime + 1)
            }, 1000);
        }
    };
    const handleOnVolumeChnage = (event: any) => {
        console.log("volume value", event.target.value);
        setVolume(+event.target.value);
        audio.current.volume = +event.target.value / 100
        console.log("audio.current.volume", audio.current.volume);
    }
    useEffect(() => {
        if(audioPlayerState?.audioUrl) {
            audio.current.onloadedmetadata = () => {
                setDuration(audio.current.duration);
                setCurrentTime(0);
            }
            audio.current.onended = () => {
                clearInterval(intervalHandler);
                audioPlayerState?.setIsPlaying(false);
                audio.current.currentTime = 0;
                setCurrentTime(0);
            }
        }
        audio.current.src = `${audioPlayerState?.audioUrl}`;
        audio.current.load();
        console.log("audio.current.src", audio.current.src)
        console.log("audio", audio);
    }, [audioPlayerState?.audioUrl, audio.current.ended])
    
    return (
        <div className="flex ">
        {audioPlayerState?.isShowing && (
            <div 
                className="fixed bottom-0 w-full bg-gray-300 bg-opacity-50"
            >
                <div 
                style={{boxShadow: `0px 3px 80px 0.2px rgba(0,0,0,0.31)` }} 
                className="flex justify-center  py-4">
                    <button
                        className='absolute top-0 right-0 text-2xl mr-4'
                        onClick={handleOnCloseClick}>
                        <i className="far fa-window-close"></i>
                    </button>
                    <Link to={`/${audioPlayerState.episode?.podcast.id}/episodes/${audioPlayerState.episode?.id}`}>
                        <div className='flex'>
                            <div
                                className="lg:block w-20 h-20 bg-cover bg-center rounded-xl sm:hidden"
                                style={{backgroundImage: `url(${audioPlayerState.thumbnail})`}}
                            />
                            <p className='self-center ml-3 text-xl font-bold'>
                                {audioPlayerState.episode?.title && audioPlayerState.episode?.title.length >15 
                                ? `${audioPlayerState.episode?.title.substring(0,15)}`
                                : audioPlayerState.episode?.title
                            }
                            </p>
                        </div>
                    </Link>
                    <div className='flex items-center ml-16 '>
                        <div>
                        <button 
                            className='text-4xl mr-4 text-blue-500 '
                            onClick={handleOnPlayButton}>
                            {audioPlayerState?.isPlaying
                            ? <i className="far fa-pause-circle"></i>
                            : <i className="fas fa-play-circle"></i>}
                        </button>
                        </div>
                        <div>{secondsToTime(currentTime)}</div>
                        <div>
                            <input
                            className='xl:px-40 lg:px-12 sm:px-8'
                                type="range"
                                min={0}
                                max={duration}
                                value={currentTime}
                                onChange={handleOnChangeTime}
                                
                            />
                        </div>
                        <div>{secondsToTime(duration)}</div>
                        <div>
                    </div>
                        <div className='ml-16 lg:flex sm:hidden '>
                            <div  className='text-4xl mr-4 text-blue-500'>
                                {volume >= 50 && <i className="fas fa-volume-down"></i>}
                                {volume < 50 && volume != 0 && <i className="fas fa-volume-off"></i>}
                                {volume == 0 && <i className="fas fa-volume-mute"></i>}
                            </div>
                            <input
                                className=""
                                type="range"
                                min={0}
                                max={100}
                                onChange={handleOnVolumeChnage}
                                value={volume}
                            />
                        </div>
                    </div>
                </div>
            </div> 

        )}
        </div>
    )
}