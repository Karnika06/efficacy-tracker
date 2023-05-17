import React, { useState } from "react";
import { FaBars, FaTh, FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { logoutUser } from "../../auth/actions/userActions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButtonStyled } from "../Styles";
import useViewport from "../../viewport/useViewport";

function Sidebar({ children, menuItem, logoutUser }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  const { isMobile, isTablet } = useViewport();


  return (
    <div className="container">
      {/* <div className='fixed-section'> */}

      <div className="top-section">
        <div style={{ display: "flex" }}>
          <h5 className="logo" style={{ fontSize: '20px', display: isOpen ? "block" : "none" }}>
            Efficacy Tracker
          </h5>
          <div
            className="bars"
            style={{ marginLeft: isOpen ? "50px" : "0px" }}
          >
            <FaBars onClick={toggle} />
          </div>
        </div>

        <ButtonStyled
          style={{ width: "100px" }}
          onClick={() => logoutUser(navigate)}
        >
          Logout
        </ButtonStyled>
      </div>
      <div className="sidebar" style={{ width: isOpen ? "250px" :"60px" ,display: isOpen ? "" : isMobile ? 'none' : ''}}>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
          >
            <div className="icon" style={{width: '30px'}}>{item.icon}</div>
            <div
              className="page-name"
              style={{ display: isOpen ? "block" : "none" }}
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      {/* </div> */}
      <main style={{ marginLeft: isOpen ? isMobile ? "0" : "250px" : isMobile ? "0" : "60px" }}>{children}</main>
    </div>
  );
}

export default connect(null, { logoutUser })(Sidebar);
