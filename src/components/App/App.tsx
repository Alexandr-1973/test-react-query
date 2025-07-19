import css from "./App.module.css";
import { createNote, deleteNote, fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import ReactPaginate from "react-paginate";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import type { Note } from "../../types/note";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["notes", query, page],
    queryFn: () => fetchNotes(query, page),
    placeholderData: keepPreviousData,
  });

  const addNoteMutation = useMutation({
    mutationFn: (note: Note) => createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", query, page] });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", query, page] });
    },
  });

  const handleQueryChange = useDebouncedCallback((newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  }, 300);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onSubmitNote = (note: Note) => {
    addNoteMutation.mutate(note);
    closeModal();
  };

  const onDelete = (id: number) => {
    deleteNoteMutation.mutate(id);
  };

  
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
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} onSubmitNote={onSubmitNote} />
          </Modal>
        )}
      </header>
      {data && <NoteList notes={data.notes} onDelete={onDelete} />}
    </div>
  );
}

export default App;
