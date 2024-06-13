import React, { useRef, useState } from 'react';
import { Howl } from 'howler';
import music from './Music.mp3';

const audioClip = [
  { sound: music, label: 'Yea' },
];

const Music = () => {
  const [fileUpload, setFileUpload] = useState(null);
  const [fileFormat, setFileFormat] = useState('');
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
      rate: 0.9,
      volume: 0.5,
    });

    soundRef.current.play();
  };

  const pausePlay = () => {
    if (soundRef.current && soundRef.current.playing()) {
      soundRef.current.pause();
    }
  };

  const changeRate = (newRate) => {
    if (soundRef.current) {
      soundRef.current.rate(newRate);
    }
  };

  const RenderButtonSound = () => {
    return audioClip.map((soundObj, index) => (
      <div className='flex flex-row justify-center p-3' key={index}>
        <button
          onClick={() => { localPlay(soundObj.sound, 'mp3') }}
          className='p-2 m-2 bg-purple-200 rounded-lg'
        >
          {soundObj.label}
        </button>
        <button
          onClick={pausePlay}
          className='p-2 m-2 bg-red-200 rounded-lg'
        >
          Pause
        </button>
        <button
          onClick={() => changeRate(0.8)}
          className='p-2 m-2 bg-green-200 rounded-lg'
        >
          Change Rate
        </button>
      </div>
    ));
  };

  return (
    <div className='p-2 flex flex-col items-center justify-center min-h-screen bg-slate-500 text-center'>
      <h1 className='bg-red-200 p-2 m-2 rounded-lg'>Music</h1>
      {RenderButtonSound()}
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
  );
};

export default Music;
