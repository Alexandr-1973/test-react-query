import css from "./NoteList.module.css";

import type { NoteResponse } from "../../types/note";

interface NotesProps{
  notes:NoteResponse[];
  onDelete:(id:number)=>void;
}

export default function NoteList({notes, onDelete}:NotesProps) {

  console.log(notes);
  

  // const notes =[];

  return (
    <ul className={css.list}>
      {/* Набір елементів списку нотатків */}

      {notes.map((note)=>{
        return (
          <li className={css.listItem} key={note.id}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <div className={css.footer}>
          <span className={css.tag}>{note.tag}</span>
          <button className={css.button} onClick={()=>onDelete(note.id)}>Delete</button>
        </div>
      </li>
        )
      })}
    </ul>
  );
}
