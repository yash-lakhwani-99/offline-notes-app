import NotesList from "./NotesList";
import Title from "./Title";

export default function MainContent({
  activeSection,
  setActiveSection,
  onCreateNote,
  notes,
  onDeleteNote,
  onEditNote,
}) {
  switch (activeSection) {
    case "title":
      return <Title />;

    case "search":
      return (
        <div className="p-6 text-gray-900">
          <h2 className="text-xl font-semibold mb-2">Search Notes</h2>
          <p>Search bar is just a placeholder in sidebar for now.</p>
        </div>
      );

    case "sync":
      return (
        <div className="p-6 text-gray-900">
          <h2 className="text-xl font-semibold mb-2">Sync Status</h2>
          <p>All your notes are synced successfully.</p>
        </div>
      );

    case "connection":
      return (
        <div className="p-6 text-gray-900">
          <h2 className="text-xl font-semibold mb-2">Connection Status</h2>
          <p>You are currently online and connected.</p>
        </div>
      );

    case "create":
      return (
        <div className="p-6 text-gray-900">
          <h2 className="text-xl font-semibold mb-2">Create a New Note</h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={onCreateNote}
          >
            Click to Create Note
          </button>
        </div>
      );

    case "options":
      return (
        <div className="p-6 text-gray-900">
          <h2 className="text-xl font-semibold mb-2">Note Options</h2>
          <p>Options for notes will be here (e.g., settings, delete, etc.).</p>
        </div>
      );

    case "profile":
      return (
        <div className="p-6 text-gray-900">
          <h2 className="text-xl font-semibold mb-2">User Profile</h2>
          <p>Name: User Profile</p>
          <p>Email: user@example.com</p>
        </div>
      );

    case "notesList":
    default:
      return (
        <NotesList
          notes={notes}
          onAddNote={onCreateNote}
          onDeleteNote={onDeleteNote}
          onEditNote={onEditNote}
        />
      );
  }
}