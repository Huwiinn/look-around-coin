import React from "react";
import Link from "next/link";
import { gnbRoute } from "../../route/gnb";
import { colorTk } from "../style/token";
import useHeaderStore from "../app/store/HeaderStore";

const Gnb = () => {
  const { active, setActive } = useHeaderStore((state) => ({
    active: state.active,
    setActive: state.setActive,
  }));

  return (
    <>
      <div id="container">
        <ul className="gnb_ul">
          {gnbRoute.map((el) => {
            return (
              <li
                key={el.id}
                className={`gnb_li ${active === el.id ? "active" : ""}`}
                onClick={() => setActive(el.id)}>
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
          position: relative;
          font-size: 18px;
          font-weight: 700;
        }

        .gnb_li::before {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: ${colorTk[0].midBlue};
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .gnb_li.active {
          color: ${colorTk[0].topBlue};
        }

        .gnb_li:hover {
          transition-duration: 0.3s;
          color: ${colorTk[0].topBlue};
        }
        .gnb_li:hover::before {
          transform: scaleX(1);
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
