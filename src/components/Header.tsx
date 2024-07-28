"use client";

import React from "react";
import Gnb from "./Gnb";
import Image from "next/image";
import Link from "next/link";
import useHeaderStore from "../app/store/HeaderStore";
import { colorTk } from "../style/token";

const Header = () => {
  const { setActive } = useHeaderStore((state) => ({
    setActive: state.setActive,
  }));

  return (
    <>
      <div id="header">
        <Link href="/" onClick={() => setActive("")}>
          <Image src="/logo.png" width={146} height={68} alt="Logo" />
        </Link>
        <Gnb />
        <Link href="/" id="login">
          <p className="login_btn">Login</p>
        </Link>
      </div>

      <style jsx>{`
        #header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 10;
          width: 100%;
          height: 100px;
          padding: 0 20px;

          border-bottom: 1px solid lightgray;
          background-color: rgba(255, 255, 255, 0.7);
          box-shadow: 2px 2px 2px lightgrey;
        }

        .login_btn {
          width: 146px;
          text-align: center;
        }

        .login_btn:hover {
          color: ${colorTk[0].topBlue};
        }
      `}</style>
    </>
  );
};

export default Header;
