"use client";

import React from "react";
import Gnb from "./Gnb";
import Image from "next/image";

const Header = () => {
  return (
    <>
      <div id="header">
        <Image src="/logo.png" width={60} height={60} alt="Logo" />
        <Gnb />
        <div id="profile">Profile</div>
      </div>

      <style jsx>{`
        #header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 80px;
          padding: 0 20px;

          background-color: lightgray;
        }

        #profile {
          width: 32px;
          height: 32px;
          background-color: blue;
        }
      `}</style>
    </>
  );
};

export default Header;
