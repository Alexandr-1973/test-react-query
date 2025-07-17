import axios from "axios";
import type { Note } from "../types/note";

interface Response {
  notes: Note[];
  totalPages: number;
}

interface Params {
  page: number;
  search?: string;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export async function fetchNotes(
  query: string,
  page: number
) {

  const params: Params = {
    page,
  };

  if (query) {
    params.search = query;
  }

  const response = await axios.get<Response>("?perPage=12", {
    params,

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data);

  return response.data;
}
