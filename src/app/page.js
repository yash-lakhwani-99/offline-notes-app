"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/Editor";
import NoteModal from "@/components/notesModal";
import { getAllNotes, saveNote, deleteNote } from "@/indexedDB/db";
import { syncNotesToAPI, pullNotesFromAPI } from "@/utils/sync";
import { deleteNote as deleteApiNote } from "@/api/notesApi";

export default function Page() {
  const [notes, setNotes] = useState([]);
  const [isOnline, setIsOnline] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [activeSection, setActiveSection] = useState("notesList");

  useEffect(() => {
    setIsOnline(navigator.onLine);

    async function loadNotes() {
      if (navigator.onLine) {
        await pullNotesFromAPI();
      }
      const localNotes = await getAllNotes();
      setNotes(localNotes);
    }
    loadNotes();

    async function handleOnline() {
      setIsOnline(true);
      await syncNotesToAPI();
      await pullNotesFromAPI();
      setNotes(await getAllNotes());
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

  // Create or update note
  async function handleSaveNote({ title, content, id }) {
    let note;
    if (id) {
      // Update
      note = {
        ...(notes.find(n => n.id === id) || {}),
        title,
        content,
        updatedAt: new Date().toISOString(),
        synced: false,
      };
    } else {
      // Create
      note = {
        id: crypto.randomUUID(),
        title,
        content,
        updatedAt: new Date().toISOString(),
        synced: false,
      };
    }
    await saveNote(note);
    if (isOnline) {
      await syncNotesToAPI();
      await pullNotesFromAPI();
    }
    setNotes(await getAllNotes());
    setModalOpen(false);
    setEditingNote(null);
  }

  async function handleDeleteNote(id) {
    const note = notes.find(n => n.id === id);
    if (isOnline && note && note.synced && note.apiId) {
      try {
        await deleteApiNote(note.apiId);
      } catch (e) {
        // Optionally handle API delete error
      }
    }
    await deleteNote(id);
    setNotes(await getAllNotes());
  }

  function handleEditNote(note) {
    setEditingNote(note);
    setModalOpen(true);
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOnline={isOnline}
        onCreateNote={() => {
          setEditingNote(null);
          setModalOpen(true);
        }}
      />
      <div className="flex-1 overflow-auto bg-white">
        <MainContent
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onCreateNote={() => {
            setEditingNote(null);
            setModalOpen(true);
          }}
          notes={notes}
          onDeleteNote={handleDeleteNote}
          onEditNote={handleEditNote}
        />
      </div>
      <NoteModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        editingNote={editingNote}
      />
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50">
          You are offline — changes will sync when you’re back online.
        </div>
      )}
    </div>
  );
}