import React from "react";


const NotFound = () => {
  return (
    <div className="mt-10 absolute min-h-[60vh] text-center flex flex-col items-center justify-center">
       <h2 className=" left-[50%] top-[50%] font-lg font-bold text-slate-100 ">Opps! Something went wrong</h2>
      <h1 className="absolute text-slate-100 opacity-30 text-9xl" style={{fontSize:250}}>403</h1>
      <p className=" left-[50%] top-[50%] font-lg font-bold text-slate-100">The page you try to enter is forbidden</p>
    </div>
  );
};

export default NotFound;