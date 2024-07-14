import React from "react";

const LayoutBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="container">{children}</div>
      <style jsx>{`
        .container {
          padding: 0 20px;
        }
      `}</style>
    </>
  );
};

export default LayoutBody;
