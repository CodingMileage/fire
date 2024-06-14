import React, { useRef, useState, useEffect } from "react";
import { Howl } from "howler";
import MusicPlayer from "./MusicPlayer";
import music from "./Music.mp3";

const audioClip = [
  {
    sound:
      "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
    label: "Yea",
  },
];

const Music = () => {
  const [fileUpload, setFileUpload] = useState(null);
  const [fileFormat, setFileFormat] = useState("");
  const [rate, setRate] = useState(1.0);
  const [vol, setVol] = useState(0.5);
  const [songLength, setSongLength] = useState(0);
  const [title, setTitle] = useState("");

  const soundRef = useRef(null);

  useEffect(() => {
    if (soundRef && soundRef.current) {
      setSongLength(soundRef.current.duration());
    }
  }, [soundRef]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const fileName = file.name;
      const fileExtension = file.name.split(".").pop();
      setFileUpload(fileUrl);
      setFileFormat(fileExtension);
      setTitle(fileName);
    }
  };

  const localPlay = (src, format) => {
    if (soundRef.current) {
      soundRef.current.unload();
    }

    soundRef.current = new Howl({
      src,
      format: [format],
      rate: 1.0,
      volume: vol,
      onload: () => {
        setSongLength(soundRef.current._duration);
        // console.log(soundRef.current._duration % 60);
      },
    });

    soundRef.current.play();
  };

  // const sound = new Howl({
  //   src,
  //   format: [format],
  //   onload: () => {
  //     console.log("Great");
  //   },
  // });

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
      const newRate = Math.max(0, Math.min(2, currentRate + delta));
      soundRef.current.rate(newRate);
      setRate(newRate);
    }
  };

  const changeVolume = (delta) => {
    if (soundRef.current) {
      const currentVolume = soundRef.current.volume();
      const newVolume = Math.max(0, Math.min(1, currentVolume + delta));
      soundRef.current.volume(newVolume);
      setVol(newVolume);
    }
  };

  const durationn = () => {};

  // const RenderButtonSound = () => {
  //   return audioClip.map((soundObj, index) => (
  //     <div className="justify-center p-3 " key={index}>
  //       <p>{soundObj.label}</p>
  //       <button
  //         onClick={() => { localPlay(soundObj.sound, 'mp3') }}
  //         className='p-2 m-2 bg-purple-200 rounded-lg'
  //       >
  //         {soundObj.label}
  //       </button>

  //       <p className='p-2 m-2 bg-blue-200 rounded-lg'>
  //         {soundObj.sound.split('/').pop().split('.')[0]}
  //       </p>

  //       {console.log(soundRef)}

  //       <button onClick={pausePlay} className="btnn">
  //         Pause
  //       </button>

  //       <button
  //         onClick={() => changeRate((prompt("Enter value")))}
  //         className='bg-green-200 btnn hover:bg-green-600'
  //       >
  //         Change Rate
  //       </button>
  //     </div>
  //   ));
  // };

  return (
    <div className="card">
      <MusicPlayer
        pausePlay={pausePlay}
        vol={vol}
        rate={rate}
        changeRate={changeRate}
        changeVolume={changeVolume}
        soundRef={soundRef}
        songLength={songLength}
        title={title}
      />

      <div className="flex flex-col items-center justify-center p-3">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="p-2 m-2 bg-gray-200 rounded-lg"
        />
        {fileUpload && (
          <button
            onClick={() => {
              localPlay(fileUpload, fileFormat);
            }}
            className="p-2 m-2 bg-blue-200 rounded-lg"
          >
            Play Uploaded File
          </button>
        )}
      </div>
      {/* {RenderButtonSound()} */}
    </div>
  );
};

export default Music;
