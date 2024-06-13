import React, { useRef, useState } from 'react';
import { Howl } from 'howler';
import music from './Music.mp3';

const audioClip = [
  { sound: "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3", label: 'Yea' },
];

const Music = () => {
  const [fileUpload, setFileUpload] = useState(null);
  const [fileFormat, setFileFormat] = useState('');
  const [rate, setRate] = useState(1.0);
  const [vol, setVol] = useState(0.5);


  const soundRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const fileExtension = file.name.split('.').pop();
      setFileUpload(fileUrl);
      setFileFormat(fileExtension);
    }
  };

  const localPlay = (src, format) => {
    if (soundRef.current) {
      soundRef.current.unload(); // Unload the previous sound if it exists
    }

    soundRef.current = new Howl({
      src,
      format: [format],
      rate: 1.0,
      volume: vol,
    });

    soundRef.current.play();
  };

  const pausePlay = () => {
    if (soundRef.current && soundRef.current.playing()) {
      soundRef.current.pause();
    } else if (soundRef.current && soundRef.current.pause()) {
      soundRef.current.play();
    }
  };

  const changeRate = (delta) => {
    if (soundRef.current) {
      const currentRate = soundRef.current.rate();
      const newRate = Math.max(0, Math.min(1, currentRate + delta));
      soundRef.current.rate(newRate);
      setRate(newRate)
    }
  };

  const changeVolume = (delta) => {
    if (soundRef.current) {
      const currentVolume = soundRef.current.volume();
      const newVolume = Math.max(0, Math.min(1, currentVolume + delta));
      soundRef.current.volume(newVolume);
      setVol(newVolume)
    }
  };

  const RenderButtonSound = () => {
    return audioClip.map((soundObj, index) => (
      <div className='flex flex-row justify-center p-3' key={index}>
        <p>{soundObj.label}</p>
        <button
          onClick={() => { localPlay(soundObj.sound, 'mp3') }}
          className='p-2 m-2 bg-purple-200 rounded-lg'
        >
          {soundObj.label}
        </button>
        {/* <p className='p-2 m-2 bg-blue-200 rounded-lg'>
          {soundObj.sound.split('/').pop().split('.')[0]}
        </p> */}

        <div className='flex-center items-center'>
          <div>
            <h1 className='font-bold text-center'>Volume: {Math.round(vol * 100)}%</h1>
            <button 
              className='btnn px-4 py-1'
              onClick={() => changeVolume(-0.1)}
            >
              -
            </button>

            <button 
              className='btnn px-4 py-1'
              onClick={() => changeVolume(0.05)}
            >
              +
            </button>
          </div>
          <div>
          <h1 className='font-bold text-center'>Rate: {Math.round(rate * 100)}%</h1>
          <button 
            className='btnn px-4 py-1'
            onClick={() => changeRate(-0.05)}
          >
            -
        </button>

        <button 
          className='btnn px-4 py-1'
          onClick={() => changeRate(0.05)}
          >
            +
        </button>
          </div>
        </div>

        <button
          onClick={pausePlay}
          className='btnn'
        >
          Pause
        </button>
{/* 
        <button
          onClick={() => changeRate((prompt("Enter value")))}
          className=' btnn bg-green-200 hover:bg-green-600'
        >
          Change Rate
        </button> */}
        
        <div className='flex flex-col items-center justify-center p-3'>
        <input 
          type="file" 
          accept="audio/*" 
          onChange={handleFileChange} 
          className='p-2 m-2 bg-gray-200 rounded-lg'
        />
        {fileUpload && (
          <button
            onClick={() => { localPlay(fileUpload, fileFormat) }}
            className='p-2 m-2 bg-blue-200 rounded-lg'
          >
            Play Uploaded File
          </button>
        )}
      </div>
      </div>
    ));
  };

  return (
    <div className='card'>
      {/* <h1 className='bg-red-200 p-2 m-2 rounded-lg'>Music</h1> */}
      {RenderButtonSound()}
      
    </div>
  );
};

export default Music;
