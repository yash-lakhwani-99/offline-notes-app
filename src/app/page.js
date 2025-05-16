"use client"

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/Editor";
import NoteModal from "@/components/notesModal";
import { getAllNotes, saveNote } from "@/indexedDB/db";

export default function Page() {
  const [activeSection, setActiveSection] = useState("title");
  const [isOnline, setIsOnline] = useState(true);
  const [notes, setNotes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    async function loadNotes() {
      const localNotes = await getAllNotes();
      setNotes(localNotes);
    }
    loadNotes();

    function handleOnline() {
      setIsOnline(true);
      (async () => {
        const localNotes = await getAllNotes();
        const unsyncedNotes = localNotes.filter(n => n.syncStatus === "unsynced");
        for (const note of unsyncedNotes) {
          await saveNote({ ...note, syncStatus: "synced" });
        }
        setNotes(await getAllNotes());
      })();
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

  // Open modal instead of creating note directly
  function openCreateNoteModal() {
    setModalOpen(true);
  }

  async function handleSaveNote({ title, content }) {
    const note = {
      title: title || "Untitled Note",
      content: content || "",
      lastUpdated: new Date().toISOString(),
      syncStatus: isOnline ? "synced" : "unsynced",
    };
    await saveNote(note);
    setNotes(await getAllNotes());
    setModalOpen(false);
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOnline={isOnline}
        onCreateNote={openCreateNoteModal}
      />
      <div className="flex-1 overflow-auto bg-white">
        <MainContent
          activeSection={activeSection}
          onCreateNote={openCreateNoteModal}
          notes={notes}
          setActiveSection={setActiveSection}
        />
      </div>
      <NoteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveNote}
      />
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50">
          You are offline — changes will sync when you’re back online.
        </div>
      )}
    </div>
  );
}