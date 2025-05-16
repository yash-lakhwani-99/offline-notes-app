import React from "react";
import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/24/outline";

function formatLastUpdated(text) {
  return `Last updated ${text}`;
}

const NotesList = ({ notes, onAddNote }) => {
  const hasNotes = notes && notes.length > 0;

  return (
    <div className="flex flex-col flex-grow p-6 bg-gray-50 h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">All Notes</h2>
        <div className="text-gray-500 text-sm">{notes?.length ?? 0} notes</div>
      </div>

      {/* Add Note Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setActiveSection("create")}
          className="m-4 p-4 flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Create Note</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search notes..."
          disabled
          className="w-full px-4 py-2 rounded border border-gray-300 bg-white text-gray-700 placeholder-gray-400 cursor-not-allowed focus:outline-none"
        />
      </div>

      {/* Notes or Empty State */}
      {hasNotes ? (
        <div className="space-y-4">
          {notes.map((note) => {
            let badgeText = "";
            let badgeClass = "";

            if (note.syncStatus === "synced") {
              badgeText = "Synced";
              badgeClass = "bg-green-100 text-green-700";
            } else if (note.syncStatus === "syncing") {
              badgeText = "Syncing...";
              badgeClass = "bg-yellow-100 text-yellow-800";
            } else if (note.syncStatus === "unsynced") {
              badgeText = "Unsynced";
              badgeClass = "bg-red-100 text-red-700";
            }

            return (
              <div
                key={note.id}
                className={`p-4 rounded-lg shadow-sm bg-white border ${
                  note.syncStatus === "syncing"
                    ? "border-yellow-300"
                    : "border-transparent"
                }`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-md font-semibold text-gray-900">
                    {note.title}
                  </h3>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}
                  >
                    {badgeText}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 mb-2">
                  {formatLastUpdated(note.lastUpdated)}
                </p>
                <p className="text-sm text-gray-700 truncate">{note.preview}</p>
                <div className="flex justify-end mt-2">
                  <button
                    aria-label="More options"
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow text-center text-gray-500 space-y-4 mt-16">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No notes"
            className="w-24 h-24 mx-auto opacity-40"
          />
          <p className="text-lg font-medium">No notes available</p>
          <p className="max-w-xs">
            You don't have any notes yet. Start by creating a new note to keep
            your ideas organized.
          </p>
        </div>
      )}
    </div>
  );
};

export default NotesList;
