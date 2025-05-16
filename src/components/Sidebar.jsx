import React from "react";
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  WifiIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  UserCircleIcon,
  Bars3Icon, // Import the list icon
} from "@heroicons/react/24/outline";

export default function Sidebar({ 
  activeSection, 
  setActiveSection, 
  isOnline, 
  onCreateNote 
}) {
  return (
    <div className="hidden md:flex flex-col w-80 bg-white border-r border-gray-300 h-screen">
      {/* Title */}
      <div className="p-5 border-b border-gray-300 flex items-center space-x-2 cursor-pointer"
           onClick={() => setActiveSection("title")}>
        <h1 className="font-bold text-lg text-gray-900">Markdown Notes</h1>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 flex items-center space-x-2 cursor-pointer"
           onClick={() => setActiveSection("search")}>
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-700" />
        <input
          type="text"
          placeholder="Search notes..."
          disabled
          className="flex-grow px-3 py-2 border border-gray-300 rounded focus:outline-none bg-gray-100 cursor-not-allowed text-gray-700"
        />
      </div>

      {/* Sync Status */}
      <div className="p-4 border-b border-gray-200 flex items-center space-x-2 cursor-pointer"
           onClick={() => setActiveSection("sync")}>
        <ArrowPathIcon className="h-5 w-5 text-gray-700" />
        <span className="text-gray-900">All changes synced</span>
      </div>

      {/* Connection Status */}
      <div className="p-4 border-b border-gray-200 flex items-center space-x-2 cursor-pointer"
           onClick={() => setActiveSection("connection")}>
        <WifiIcon className={`h-5 w-5 ${isOnline ? "text-green-600" : "text-red-600"}`} />
        <span className="text-gray-900">{isOnline ? "Online" : "Offline"}</span>
      </div>

      
      {/* Notes List Button */}
      <button
        onClick={() => setActiveSection("notesList")}
        className="mx-4 mt-4 mb-4 flex items-center justify-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 rounded-md"
      >
        <Bars3Icon className="h-5 w-5" />
        <span>Notes List</span>
      </button>

      {/* Note Options */}
      <div className="px-4 py-3 border-t border-gray-300 flex justify-end cursor-pointer"
           onClick={() => setActiveSection("options")}>
        <EllipsisVerticalIcon className="h-6 w-6 text-gray-700" />
      </div>

      {/* User Profile */}
      <div
        className="border-t border-gray-300 p-4 flex items-center space-x-3 cursor-pointer mt-auto"
        onClick={() => setActiveSection("profile")}
      >
        <UserCircleIcon className="h-10 w-10 text-gray-700" />
        <div className="text-sm">
          <div className="font-semibold text-gray-900">User Profile</div>
          <div className="text-gray-700">user@example.com</div>
        </div>
      </div>
    </div>
  );
}
