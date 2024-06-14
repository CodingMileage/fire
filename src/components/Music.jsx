import React, { useRef, useState, useEffect } from "react";
import { Howl } from "howler";
import MusicPlayer from "./MusicPlayer";

const Music = () => {
  const [fileUpload, setFileUpload] = useState(null);
  const [fileFormat, setFileFormat] = useState("");
  const [rate, setRate] = useState(1.0);
  const [vol, setVol] = useState(0.5);
  const [songLength, setSongLength] = useState(0);
  const [title, setTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const soundRef = useRef(null);

  useEffect(() => {
    if (soundRef.current) {
      setSongLength(soundRef.current.duration());
    }
  }, [soundRef.current]);

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

  const handleFolderChange = (event) => {
    const files = Array.from(event.target.files);
    const audioFiles = files.filter(file => file.type.startsWith("audio/"));
    setFileList(audioFiles.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name,
      format: file.name.split('.').pop()
    })));
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
        setSongLength(soundRef.current.duration());
      },
    });

    soundRef.current.play();
  };

  const pausePlay = () => {
    if (soundRef.current) {
      if (soundRef.current.playing()) {
        soundRef.current.pause();
      } else {
        soundRef.current.play();
      }
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

  const changeSong = () => {
    if (fileList) {
      console.log(soundRef.current)
      console.log(fileList)
    }
  }

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
        changeSong={changeSong}
      />

      <div className="flex flex-col items-center justify-center p-3">
        {/* <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="p-2 m-2 bg-gray-200 rounded-lg"
        /> */}
        <input
          type="file"
          webkitdirectory=""
          multiple
          onChange={handleFolderChange}
          className="p-2 m-2 bg-gray-200 rounded-lg"
        />
        {fileUpload && (
          <button
            onClick={() => localPlay(fileUpload, fileFormat)}
            className="p-2 m-2 bg-blue-200 rounded-lg"
          >
            Play Uploaded File
          </button>
        )}
        {fileList.length > 0 && (
          <div className="flex flex-wrap flex-col">
            {fileList.map((file, index) => (
              <div key={index} className="p-2 m-2 flex flex-col  bg-gray-100 rounded-lg">
                <p>{file.name}</p>
                <button
                  onClick={() => localPlay(file.url, file.format)}
                  className="p-2 m-2 btn bg-green-200 rounded-lg"
                >
                  Play
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Music;
