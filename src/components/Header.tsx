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
          <span className="login_btn">Login</span>
        </Link>
      </div>

      <style jsx>{`
        #header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 100px;
          padding: 0 20px;

          border-bottom: 1px solid lightgray;
        }

        .login_btn:hover {
          color: ${colorTk[0].topBlue};
        }
      `}</style>
    </>
  );
};

export default Header;
