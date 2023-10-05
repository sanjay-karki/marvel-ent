import React from "react";

const Error = () => {
  return (
    <div className="my-16 mx-8">
      <h1 className="text-6xl text-slate-300 mb-12 font-bold">
        This page doesn't exist. 😞
      </h1>

      <a href="/home">
        <span className="font-bold text-4xl transition-all hover:text-red-700 text-white underline hover:no-underline">
          Go back to homepage.
        </span>
      </a>
    </div>
  );
};

export default Error;
