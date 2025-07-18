import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import ReactPaginate from "react-paginate";
import Modal from "../Modal/Modal";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["notes", query, page],
    queryFn: () => fetchNotes(query, page),
    placeholderData: keepPreviousData,
  });

  const handleQueryChange = useDebouncedCallback((newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  }, 1000);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  console.log(data);

  // fetchNotes();

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChangeQuery={handleQueryChange} query={query} />
        {data && data.totalPages > 1 && (
          <ReactPaginate
            pageCount={data.totalPages}
            pageRangeDisplayed={4}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
        {isModalOpen && <Modal onClose={closeModal} />}
      </header>
      <NoteList notes={data ? data.notes : []} />
    </div>
  );
}

export default App;
