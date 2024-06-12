import React, { useState } from "react";
import { FiHome } from "react-icons/fi";
import { BsPlus, BsGearFill } from "react-icons/bs";
import { FaFire, FaPoo } from "react-icons/fa";
import { logout } from "./Auth";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

const SideBar = () => {
  const [fileUpload, setFileUpload] = useState(null);
  const [fileType, setFileType] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;

    let filesFolderRef;
    if (fileType.includes("audio")) {
      filesFolderRef = ref(storage, `music/${fileUpload.name}`);
    } else if (fileType.includes("image")) {
      filesFolderRef = ref(storage, `image/${fileUpload.name}`);
    } else {
      alert("Please select an audio or image file!");
      setFileUpload(null);
      return;
    }

    try {
      await uploadBytes(filesFolderRef, fileUpload);
      alert("File uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("File upload failed!");
    } finally {
      setFileUpload(null);
      setFileType("");
    }
  };

  return (
    <div
      className="top-0 w-screen w-16 m-0 
        flex flex-row bg-gray-900 text-white shadow
        bg-primar text-secondary"
    >
      <SideBarIcon
        onClick={uploadFile}
        icon={<FaFire size="28" />}
        text="Fire"
      />
      <SideBarIcon
        icon={<BsPlus size="32" />}
        text="Add"
        isInput={true}
        onFileChange={(e) => {
          const file = e.target.files[0];
          if (
            file &&
            (file.type.includes("audio") || file.type.includes("image"))
          ) {
            setFileUpload(file);
            setFileType(file.type);
          } else {
            alert("File must be an audio or image file!");
            setFileUpload(null);
            setFileType("");
          }
        }}
      />
      {/* <SideBarIcon icon={<FaPoo size="20" />} text="Poop" /> */}
      <SideBarIcon
        onClick={logout}
        icon={<FaArrowRightFromBracket size="20" />}
        text="Logout"
      />
    </div>
  );
};

const SideBarIcon = ({ icon, text, onClick, isInput, onFileChange }) => {
  if (isInput) {
    return (
      <div className="sidebar-icon group relative">
        {icon}
        <input
          type="file"
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          onChange={onFileChange}
        />
        <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
      </div>
    );
  }

  return (
    <button className="sidebar-icon group" onClick={onClick}>
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </button>
  );
};

export default SideBar;
