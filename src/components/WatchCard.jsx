"use client"
import React, { useEffect, useRef, useState } from 'react';
import {useQuery } from 'react-query'
import videojs from "video.js";
import 'video.js/dist/video-js.css';


const WatchCard = ({id, searchParams}) => {
  const {searchId,searchTermOption,watchId} = searchParams
    const [quality, setQuality] = useState(null)
    const playerRef = React.useRef(null);

    const { isLoading, error, data } = useQuery('anime', () =>
    fetch(`http://localhost:3000/api/${searchTermOption}?watch=${searchTermOption=="anime"?watchId:searchId}&id=${watchId}`).then(res =>
      res.json()
      
    ).then(res=>res.sources)
  )

  
  if (isLoading | data == undefined) return <span className="loading loading-dots loading-lg"></span>
  
  if (error) return 'An error has occurred: ' + error.message
  if(data){
    const placeHolder = data[0].url
    const videoJsOptions = {

      controls: true,
      responsive: true,
      fluid: true,
      sources: [{
        src: quality?quality:placeHolder,
        type: 'application/x-mpegURL'
      }]
    };
  
    const handlePlayerReady = (player) => {
      playerRef.current = player;
  
      // You can handle player events here, for example:
      player.on('waiting', () => {
        videojs.log('player is waiting');
      });
  
      player.on('dispose', () => {
        videojs.log('player will dispose');
      });
    };



  

    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            <div>
            <h1 className="text-5xl font-bold">{id}</h1>
            </div>
            <div>
              {data.map(({quality,url})=>(

                  <button key={quality} className='btn btn-primary' onClick={()=>(setQuality(url))}>{quality}</button>
              ))}
            </div>
        </div>
        </div>
    );
}}

export default WatchCard;



export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const {options, onReady} = props;

  React.useEffect(() => {

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

    // You could update an existing player in the `else` block here
    // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef}  className='w-[80vw]'/>
    </div>
  );
}
