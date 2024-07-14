"use client";
import LayoutBody from "../components/LayoutBody";

export default function Home() {
  return (
    <>
      <LayoutBody>
        <h1 className="title">메인 컨텐츠</h1>
      </LayoutBody>
      <style jsx>{`
        .container {
          padding: 0 20px;
        }
        .title {
          color: red;
        }
      `}</style>
    </>
  );
}
