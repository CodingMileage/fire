import React from 'react';
import { FiHome } from 'react-icons/fi';
import { BsPlus, BsGearFill } from 'react-icons/bs';
import { FaFire, FaPoo } from 'react-icons/fa';
import { logout } from "./Auth";
import { uploadFile } from './MovieDB';
import { FaArrowRightFromBracket } from "react-icons/fa6";


const SideBar = () => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          uploadFile(file);
        }
      };
  return (
    <div className='fixed top-0 w-screen w-16 m-0 
        flex flex-row bg-gray-900 text-white shadow
        bg-primar text-secondary'>
        {/* <i>A</i>B<i>C</i>D<i>E</i> */}

        <SideBarIcon onClick={uploadFile} icon={<FaFire size="28"/>}/>
        <SideBarIcon icon={<BsPlus size="32"/>}text="Add" isInput={true} onFileChange={handleFileChange} />
        <SideBarIcon icon={<FaPoo size="20"/>}/>
        <SideBarIcon onClick={logout} icon={<FaArrowRightFromBracket size="20" text="Logout"/>}/>

    </div>
  );
}

const SideBarIcon = ({ icon, text = 'tooltip 🔥', onClick, isInput, onFileChange }) => {

    if (isInput) {
        return (
          <div className="sidebar-icon group relative">
            {icon}
            <input
              type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              onChange={onFileChange}
            />
            <span className="sidebar-tooltip group-hover:scale-100">
              {text}
            </span>
          </div>
        );
      }

  return (
  <>
    <button className="sidebar-icon group" onClick={onClick}>
        {icon}

        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>
    </button>
    </>
  );
}

export default SideBar;
