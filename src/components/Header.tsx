"use client";

import React from "react";
import Gnb from "./Gnb";
import Image from "next/image";
import Link from "next/link";
import useHeaderStore from "../app/store/HeaderStore";

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
        <div id="login">Login</div>
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
      `}</style>
    </>
  );
};

export default Header;
