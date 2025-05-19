import { getAllNotes, deleteNote } from "@/indexedDB/db";
import { fetchNotes } from "@/api/notesApi";

export async function cleanupDuplicates() {
  const localNotes = await getAllNotes();
  const remoteNotes = await fetchNotes();

  for (const remote of remoteNotes) {
    const dups = localNotes.filter(
      n =>
        n.id !== remote.id &&
        n.title === remote.title &&
        n.content === remote.content &&
        n.updatedAt === remote.updatedAt
    );
    for (const dup of dups) {
      await deleteNote(dup.id);
    }
  }
}