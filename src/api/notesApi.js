import axios from "axios";

const API_URL = "https://682718fc397e48c913189276.mockapi.io/api/v1/notes";

export async function fetchNotes() {
  const res = await axios.get(API_URL);
  return res.data;
}

export async function createNote(note) {
  const res = await axios.post(API_URL, note);
  return res.data;
}

export async function updateNote(id, note) {
  const res = await axios.put(`${API_URL}/${id}`, note);
  return res.data;
}

export async function deleteNote(id) {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
}