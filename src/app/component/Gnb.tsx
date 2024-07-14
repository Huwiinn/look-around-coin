import React from "react";
import Link from "next/link";

const Gnb = () => {
  return (
    <>
      <div id="container">
        <ul className="gnb_ul">
          <li>
            <Link href="/">코인 시세</Link>
          </li>
          <li>
            <Link href="/">커뮤니티</Link>
          </li>
          <li>
            <Link href="/">소개</Link>
          </li>
        </ul>
      </div>
      <style jsx>{`
        #container {
          width: 400px;
        }

        #container:hover {
          color: red;
        }

        .gnb_ul {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default Gnb;
