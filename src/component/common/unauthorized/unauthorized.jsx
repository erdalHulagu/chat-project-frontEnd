import React from "react";
import "./unauthorized.scss";

const Unauthorized = () => {
  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <h2 content="403" className=" absolute left-[50%] top-[50%] font-lg font-bold text-slate-100">Opps! Something went wrong</h2>
      <p lassName=" absolute left-[50%] top-[50%] font-lg font-bold text-slate-100">The page you try to enter is forbidden</p>
    </div>
  );
};

export default Unauthorized;
