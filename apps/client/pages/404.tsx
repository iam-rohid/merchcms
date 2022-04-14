import Link from "next/link";
import React from "react";

const PageNotFound = () => {
  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center flex-col">
      <h1 className="text-7xl font-bold mb-2">404</h1>
      <p className="text-3xl mb-4">Page Not Found</p>
      <Link href={`/`}>
        <a className="text-xl text-blue-500 hover:underline">Go Back</a>
      </Link>
    </div>
  );
};

export default PageNotFound;
