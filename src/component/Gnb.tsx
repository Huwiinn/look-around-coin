import React, { useState } from "react";
import Link from "next/link";
import { gnbRoute } from "../../route/gnb";
import { colorTk } from "../style/token";

const Gnb = () => {
  const [isActiveIdx, setIsActiveIdx] = useState("");

  const handleActiveLi = (id: string) => {
    setIsActiveIdx(id);
  };

  return (
    <>
      <div id="container">
        <ul className="gnb_ul">
          {gnbRoute.map((el) => {
            return (
              <li
                key={el.id}
                className={`gnb_li ${isActiveIdx === el.id ? "active" : ""}`}
                onClick={() => handleActiveLi(el.id)}>
                <Link href={el.route}>{el.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <style jsx>{`
        #container {
          width: 400px;
        }

        .gnb_li {
          font-size: 18px;
          font-weight: 700;
        }

        .gnb_li.active {
          color: ${colorTk[0].topBlue};
        }

        .gnb_li:hover {
          transition-duration: 0.3s;
          color: ${colorTk[0].topBlue};
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
