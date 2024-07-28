import React from "react";

const LayoutBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="container">{children}</div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
          padding: 0 20px;
        }
      `}</style>
    </>
  );
};

export default LayoutBody;
