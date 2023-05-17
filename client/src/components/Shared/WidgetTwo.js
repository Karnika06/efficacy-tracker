import React from "react";
import './Widget.css'
import { colors } from "../Styles";
import useViewport from "../../viewport/useViewport";
import { Link } from "react-router-dom";


export default function WidgetTwo({ type, handleClick }) {
  const {isMobile, isTablet} = useViewport()
  return (
    <div className="widget" style={{color: type.textColor, backgroundColor: type.color, marginBottom:  isMobile ? '4%' : '0'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>

        <div className="title" style={{color: type.textColor}}>{type.title}</div>
        <div>{type.subtitle}</div>
        <div style={{cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems:' center'}} onClick = {handleClick}>
            <Link to={type.link} style={{textDecoration: 'none',color: type.textColor}}>{type.linkTo}</Link>
            <span className="icon">{type.icon}</span>
        </div>
        </div>
    </div>
  );
}
