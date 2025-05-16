import React, { useState, useEffect, useRef } from "react";

export default function NoteModal({ open, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTitle("");
      setContent("");
      setTimeout(() => {
        titleRef.current?.focus();
      }, 100);
    }
  }, [open]);

  if (!open) return null;

  function handleSave() {
    if (title.trim() || content.trim()) {
      onSave({ title, content });
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") onClose();
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSave();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative animate-fade-in">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          Create New Note
        </h2>
        <div className="space-y-4">
          <input
            ref={titleRef}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold text-gray-900 placeholder-gray-400 transition"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={100}
            autoFocus
          />
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-gray-900 placeholder-gray-400 transition resize-none"
            placeholder="Content"
            rows={6}
            value={content}
            onChange={e => setContent(e.target.value)}
            maxLength={2000}
          />
        </div>
        <div className="flex justify-end space-x-3 mt-8">
          <button
            className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-5 py-2 rounded-lg font-medium transition text-white ${
              title.trim() || content.trim()
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-300 cursor-not-allowed"
            }`}
            onClick={handleSave}
            disabled={!(title.trim() || content.trim())}
          >
            Save
          </button>
        </div>
      </div>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.2s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}