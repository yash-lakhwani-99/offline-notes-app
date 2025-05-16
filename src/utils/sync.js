import { getAllNotes, saveNote, deleteNote } from "@/indexedDB/db";
import { createNote, updateNote, fetchNotes } from "@/api/notesApi";

export async function syncNotesToAPI() {
  const notes = await getAllNotes();
  const unsynced = notes.filter(n => !n.synced);

  for (const note of unsynced) {
    let apiNote;
    if (!note.apiId) {
      // Create on API
      apiNote = await createNote({
        title: note.title,
        content: note.content,
        updatedAt: note.updatedAt,
        synced: true,
      });
      // Remove the local note with the old id
      await deleteNote(note.id);
      // Save the note with the MockAPI id
      await saveNote({
        ...note,
        id: apiNote.id, // Use MockAPI id as local id
        apiId: apiNote.id,
        synced: true,
      });
    } else {
      // Update on API
      apiNote = await updateNote(note.apiId, {
        title: note.title,
        content: note.content,
        updatedAt: note.updatedAt,
        synced: true,
      });
      note.synced = true;
      await saveNote(note);
    }
  }
}

export async function pullNotesFromAPI() {
  const apiNotes = await fetchNotes();
  for (const note of apiNotes) {
    note.synced = true;
    note.apiId = note.id;
    await saveNote(note);
  }
}