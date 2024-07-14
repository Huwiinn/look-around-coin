"use client";
import Header from "./component/Header";

export default function Home() {
  return (
    <>
      <div className="container">
        <Header />
        <h1 className="container">메인 컨텐츠</h1>
      </div>
      <style jsx>{`
        h1 {
          color: blue;
          font-size: 20px;
        }
      `}</style>
    </>
  );
}
