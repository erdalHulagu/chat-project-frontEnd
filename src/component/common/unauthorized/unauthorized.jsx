import React from "react";

const Unauthorized = () => {
  return (
    <div className="h-full w-full absolute mt-10 flex flex-col items-center justify-center">
      <h2 className="font-lg font-bold text-slate-100 ">Opps! Something went wrong</h2>
      <h1 className="absolute text-slate-100 opacity-30 text-9xl"style={{fontSize:250}}>404</h1>
      <p className="  font-lg font-bold text-slate-100">The page you try to enter is forbidden</p>
    </div>
  );
};

export default Unauthorized;
