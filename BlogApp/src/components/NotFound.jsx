import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center py-10">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">404 - Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">
        The page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="px-6 py-2 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition"
      >
        Go Home
      </a>
    </div>
  );
};

export default NotFound;
