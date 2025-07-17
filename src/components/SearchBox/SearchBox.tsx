import css from "./SearchBox.module.css";

interface SearchProps {
  query: string;
  onChangeQuery: (value: string) => void;
}

export default function SearchBox({ onChangeQuery, query }: SearchProps) {

 
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={(event)=>onChangeQuery(event.target.value)}
      defaultValue={query}
    />
  );
}
