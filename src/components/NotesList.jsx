import React from "react";
import { EllipsisHorizontalIcon, PlusIcon, PencilIcon } from "@heroicons/react/24/outline";

function formatLastUpdated(text) {
  if (!text) return "";
  const date = new Date(text);
  return `Last updated ${date.toLocaleString()}`;
}

const NotesList = ({ notes, onAddNote, onDeleteNote, onEditNote }) => {
  const hasNotes = notes && notes.length > 0;
  const sortedNotes = hasNotes
    ? [...notes].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    : [];

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
          onClick={onAddNote}
          className="m-4 p-4 flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Create Note</span>
        </button>
      </div>

      {/* Notes or Empty State */}
      {hasNotes ? (
        <div className="space-y-4">
          {sortedNotes.map((note) => {
            let badgeText = "";
            let badgeClass = "";

            if (note.synced) {
              badgeText = "Synced";
              badgeClass = "bg-green-100 text-green-700";
            } else {
              badgeText = "Unsynced";
              badgeClass = "bg-red-100 text-red-700";
            }

            const preview = note.content
              ? note.content.length > 100
                ? note.content.slice(0, 100) + "..."
                : note.content
              : "";

            return (
              <div
                key={note.id}
                className="p-4 rounded-lg shadow-sm bg-white border border-transparent"
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
                  {formatLastUpdated(note.updatedAt)}
                </p>
                <p className="text-sm text-gray-900 truncate">{preview}</p>
                <div className="flex justify-end mt-2 space-x-2">
                  <button
                    aria-label="Edit"
                    className="text-blue-500 hover:text-blue-700 text-xs"
                    onClick={() => onEditNote(note)}
                  >
                    <PencilIcon className="h-5 w-5 inline" />
                    Edit
                  </button>
                  <button
                    aria-label="More options"
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 text-xs"
                    onClick={() => onDeleteNote(note.id)}
                  >
                    Delete
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