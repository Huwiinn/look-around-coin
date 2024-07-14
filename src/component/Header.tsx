"use client";

import React from "react";
import Gnb from "./Gnb";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <div id="header">
        <Link href="/">
          <Image src="/logo.png" width={146} height={68} alt="Logo" />
        </Link>
        <Gnb />
        <div id="login">로그인</div>
      </div>

      <style jsx>{`
        #header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 100px;
          margin-bottom: 20px;
          padding: 0 20px;

          border-bottom: 1px solid lightgray;
        }

        #login {
          background-color: pink;
        }
      `}</style>
    </>
  );
};

export default Header;
