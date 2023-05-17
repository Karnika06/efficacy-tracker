import React, { useState } from "react";
//import "./EmployeeCard.css";
import dp from "../../assets/testdp.jpeg";
import Avatar from "@mui/material/Avatar";
import { MdOutlineEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { MdPermIdentity } from "react-icons/md";
import { Divider } from "@mui/material";
import { SlLocationPin } from "react-icons/sl";
import { AiOutlineLinkedin } from "react-icons/ai";
import { useSelector } from "react-redux";
import './ProfileCard.css'
import useViewport from "../../viewport/useViewport";

export default function ProfileCard({userData}) {

  const { isMobile, isTablet } = useViewport();

  const [file, setFile] = useState(userData.avatar)



  return (
    <div className="user-details" style={{width: isMobile ? '100%' : '30%', marginBottom: isMobile ? '1.5%' : '0%'}}>
        <div className="user-avatar">
        {/* <img src={dp} alt='Display Pic'/> */}

        

        <Avatar alt="Display Pic" src={file || dp} sx={{ width: 90, height: 90 }} />
        
      
        <div className="employee-id" style={{ display: "flex", marginTop: '10%' }}>
          <MdPermIdentity />
          <p>{userData.id}</p>
          
        </div>
        <h3 style={{marginBottom: '1%'}}>{userData.name}</h3>
        <h4 style={{marginBottom: '3%'}}>{userData.job_role}</h4>
      </div>

      <div className="user-about-details">
        
        <p>
          {userData.description}
        </p>
      </div>

      <div className="user-contact-details">
        <div className="icon-description">
          <MdOutlineEmail size={20}/>
          <p className="icon-desc">{userData.email}</p>
        </div>
        <div className="icon-description">
          <MdPhone size={20}/>
          <p className="icon-desc">{userData.contactNumber}</p>
        </div>
        <div className="icon-description">
          <SlLocationPin size={20} />
          <p className="icon-desc">{userData.address}</p>
        </div>
        <div className="icon-description">
          <AiOutlineLinkedin size={20}/>
          <p className="icon-desc">{userData.linkedin_link}</p>
        </div>
      </div>
      
    </div>
  )
}