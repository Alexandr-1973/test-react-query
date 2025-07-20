import css from "./NoteList.module.css";

import type { NoteResponse } from "../../types/note";

interface NotesProps {
  notes: NoteResponse[];
  onDelete: (id: number) => void;
  setPage: (page: number) => void;
}

export default function NoteList({ notes, onDelete, setPage }: NotesProps) {
  const handleDelete = (id: number) => {
    onDelete(id);
    setPage(1);
  };

  return (
    <>
      {notes.length === 0 && <span>Not found</span>}
      {notes.length > 0 && (
        <ul className={css.list}>
          {notes.map((note) => (
            <li className={css.listItem} key={note.id}>
              <h2 className={css.title}>{note.title}</h2>
              <p className={css.content}>{note.content}</p>
              <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
                <button
                  className={css.button}
                  onClick={() => handleDelete(note.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
