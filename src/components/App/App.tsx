import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function App() {
  const [query, setQuery] = useState("");
  // const [fetchQuery, setFetchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["notes", query],
    queryFn: () => fetchNotes(query, page),
  });

  // const debouncedSetQuery = useDebouncedCallback((newQuery: string) => {
  //   setQuery(newQuery);
  // }, 1000);

  const handleQueryChange =  useDebouncedCallback((newQuery: string) => {
    setQuery(newQuery);
  }, 1000);

  console.log(data);

  // fetchNotes();

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChangeQuery={handleQueryChange} query={query} />
        {/* Пагінація */}
        <button className={css.button}>Create note +</button>
      </header>
      <NoteList notes={data ? data.notes : []} />
    </div>
  );
}

export default App;
