"use client";
import MainContent from "@/components/Editor";
import Sidebar from "@/components/Sidebar";
import React, { useState, useEffect } from "react";

export default function Page() {
  const [activeSection, setActiveSection] = useState("title");
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  function createNewNote() {
    alert("Create note function triggered! Implement as needed.");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOnline={isOnline}
        onCreateNote={createNewNote}
      />
      <div className="flex-1 overflow-auto bg-white">
        <MainContent activeSection={activeSection} onCreateNote={createNewNote} />
      </div>

      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50">
          You are offline — changes will sync when you’re back online.
        </div>
      )}
    </div>
  );
}
