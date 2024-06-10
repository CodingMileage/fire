import React, { useRef, useEffect } from 'react';


const AudioComponent = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div>
      <audio id="audio1" ref={audioRef} controls>
        <source src="./30.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioComponent;
