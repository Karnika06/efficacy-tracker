import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import EmployeeCard from "../../components/Admin/EmployeeCard";
import LeftBody from "../../components/Employee/LeftBody";
import ProfileCard from "../../components/Employee/ProfileCard";
import RightBody from "../../components/Employee/RightBody";
import useViewport from "../../viewport/useViewport";

export default function About() {
  const { isMobile, isTablet } = useViewport();

  const userData = useSelector((state) => state.user.User);

  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);

  return (
    <>
      <div
        className="user-profile"
        style={{
          width: "100%",
          margin: "1.5%",
          display: isMobile ? "block" : "flex",
          justifyContent: "space-between",
        }}
      >
        {isMobile ? (
          <>
            <ProfileCard userData={userData} />
            <LeftBody userData={userData} />
          </>
        ) : (
          <>
            <LeftBody userData={userData} />
            <ProfileCard userData={userData} />
          </>
        )}
      </div>
    </>
  );
}
