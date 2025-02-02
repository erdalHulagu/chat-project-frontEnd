import React from "react";

const Unauthorized = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] mt-40 text-center">
      <h2 className="text-2xl font-semibold">Oops! Something went wrong</h2>
      <p className="text-lg text-gray-600">
        The page you try to enter is forbidden
      </p>
      <span className="absolute text-[30vw] font-extrabold text-gray-200 -z-10">
        403
      </span>
    </div>
  );
};

export default Unauthorized;
