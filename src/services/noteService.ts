import axios from "axios";
import type { Note, NoteResponse } from "../types/note";

interface GetResponse {
  notes: NoteResponse[];
  totalPages: number;
}

interface deleteResponse {
  message:string;
}

interface Params {
  page: number;
  search?: string;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export async function fetchNotes(query: string, page: number) {
  const params: Params = {
    page,
  };

  if (query) {
    params.search = query;
  }

  const response = await axios.get<GetResponse>("?perPage=12", {
    params,

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data);

  return response.data;
}

export async function createNote(note: Note) {
  const response=await axios.post<NoteResponse>("", note, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data);

  return response.data;
}

export async function deleteNote(id:number){

  const response = await axios.delete<deleteResponse>(`${id}`, {headers: {
      Authorization: `Bearer ${token}`,
    }});

    return response;

}
