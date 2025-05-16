import React from "react";
import { DocumentTextIcon, ClockIcon, CloudOfflineIcon, CloudIcon } from "@heroicons/react/24/outline";

const Title = () => {
  return (
    <div className="flex flex-col items-center text-center px-6 py-12 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Offline Notes App</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        Take notes anytime, anywhere — no internet required. Your notes are always safe and synced locally.
      </p>

      <div className="flex justify-center space-x-10 mb-12">
        <div className="flex flex-col items-center text-gray-700">
          <DocumentTextIcon className="h-12 w-12 mb-2 text-blue-600" />
          <span className="text-sm font-semibold">Easy Writing</span>
        </div>
        <div className="flex flex-col items-center text-gray-700">
          <ClockIcon className="h-12 w-12 mb-2 text-green-600" />
          <span className="text-sm font-semibold">Instant Access</span>
        </div>
        <div className="flex flex-col items-center text-gray-700">
          <CloudIcon className="h-12 w-12 mb-2 text-red-600" />
          <span className="text-sm font-semibold">Offline Mode</span>
        </div>
      </div>

      {/* Use a simple placeholder img or comment out this <img> to test */}
      <img
        src="https://plus.unsplash.com/premium_photo-1683309567810-4d232ee83d2f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bm90ZXN8ZW58MHx8MHx8fDA%3D"
        alt=" "
        className="w-full max-w-md mx-auto"
        style={{ maxHeight: "300px" }}
      />
    </div>
  );
};

export default Title;
